import validator from "validator";
import bcrypt from "bcrypt"
import jwt, { decode } from 'jsonwebtoken'
// import userModel from "../models/userModel.js";
import userModel from '../models/user.js';
import OTP from '../models/OTP.js';
// const OTP = require('../models/OTP.js');
import otpGenerator from 'otp-generator';

const createToken = (id) => {
    return jwt.sign({ id }, import.meta.env.JWT_SECRET)
}

// Route for user login
// const loginUser = async (req, res) => {
//     try {

//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.json({ success: false, message: "User doesn't exists" })
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {

//             const token = createToken(user._id)
//             res.json({ success: true, token })

//         }
//         else {
//             res.json({ success: false, message: 'Invalid credentials' })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Route for user register
// const registerUser = async (req, res) => {
//     try {

//         const { name, email, password } = req.body;

//         // checking user already exists or not
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" })
//         }


//         // validating email format & strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" })
//         }
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" })
//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         })

//         const user = await newUser.save()

//         const token = createToken(user._id)

//         res.json({ success: true, token })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === import.meta.env.ADMIN_EMAIL && password === import.meta.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, import.meta.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await userModel.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await OTP.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        }

        await OTP.deleteMany({ email });

        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });

    } catch (error) {
        console.error("Error sending OTP:", error.message);
        res.status(500).json({
            success: false,
            message: "Try again",
        });
    }
};


const signup = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        // Validate input
        if (!name || !email || !password || !otp) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Verify OTP
        const recentOtpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        if (!recentOtpRecord || recentOtpRecord.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Create JWT
        const token = jwt.sign({ id: newUser._id }, import.meta.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Optional: Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: import.meta.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during signup',
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Account doesn't exist! Check entered credentials."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const payload = {
            email: user.email,
            name: user.name,
            id: user._id,
        };

        const token = jwt.sign(payload, import.meta.env.JWT_SECRET, {
            expiresIn: "7d" 
        });
        
        res.cookie("jwtToken", token, {
            httpOnly: true,      
            secure: import.meta.env.NODE_ENV === "production",
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            token,
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

const check_auth = async (req, res) => {
    const token = req.cookies.jwtToken;

    // console.log("Token hai ki nhi: ", token);

    if (token) {
        jwt.verify(token, import.meta.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Invalid or expired token' });
            }

            res.status(200).json({
                success: true,
                message: 'Token is valid',
                token: token,
                user:decoded
            });
        });
    } else {
        res.json({ success: false, message: 'No token provided' });
    }
};

const logout = (req, res) => {
    res.cookie('jwtToken', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 1),
        secure: import.meta.env.NODE_ENV === 'production'
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};


  

export { adminLogin, sendotp, signup, login ,check_auth,logout}
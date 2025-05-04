import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import validator from "validator";
import { ShopContext } from '../context/ShopContext';

function Signup() {
    const { token, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");

    const validateEmail = (emailToValidate) => {
        if (!validator.isEmail(emailToValidate)) {
            setEmailError("Please enter a valid email!");
        } else {
            setEmailError("");
        }
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !otp) {
            setMessage("All fields are required");
            return;
        }

        if (!isNaN(name)) {
            setMessage("Name cannot be a number");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(backendUrl + '/api/user/signup', { name, email, password, otp },{ withCredentials: true });
            setMessage(response.data.message);
            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Error Signing Up");
            }
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);

    const messageColor = message === "User created successfully" ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-transparent min-h-screen text-white">
            <div className="text-center pt-4">
                <div className="flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-4xl tracking-tight text-white">
                    Sign Up into your account
                </h2>
                <span className="text-sm text-neutral-300">
                    or <a href="/#" className="text-green-400 hover:text-green-300">Sign in into your account</a>
                </span>
            </div>

            <div className="flex justify-center my-2 mx-4 md:mx-0">
                <div className="w-full max-w-md rounded-lg shadow-md p-6 bg-neutral-900">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full flex md:w-full px-3 mb-6 gap-10">
                            <div className="w-1/2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Name</label>
                                <input
                                    className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">OTP</label>
                                <input
                                    className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Email address</label>
                            <input
                                className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                placeholder="Enter your email"
                                required
                            />
                            <div className="text-red-400 text-sm pt-1">{emailError}</div>
                        </div>

                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">Password</label>
                            <input
                                className="appearance-none block w-full bg-neutral-950 text-white font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="w-full flex items-center justify-between px-3 py-1 mb-3">
                            <div className="w-auto text-left">
                                <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm tracking-tight pl-2">Home</Link>
                            </div>
                            <div className="w-full text-right text-neutral-300">
                                Already have an account?
                                <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm tracking-tight pl-2">Sign In</Link>
                            </div>
                        </div>

                        <div className="w-full md:w-full px-3">
                            <button
                                onClick={handleSignup}
                                type="submit"
                                className="block w-full bg-green-600 hover:bg-green-500 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                            >
                                {loading ? 'wait...' : 'Sign Up'}
                            </button>
                        </div>

                        <div className="pt-8 mx-auto font-thin text-xl -mb-5">
                            {message && <p className={`${messageColor}`}>{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

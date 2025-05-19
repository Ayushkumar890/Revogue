import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import validator from "validator";
import { ShopContext } from '../context/ShopContext';

function Otp() {
    const { navigate, backendUrl } = useContext(ShopContext);
    const [email, setEmail] = useState('');
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

    const handleSendOtp = async () => {
        if (!email || emailError) {
            setMessage("Please enter a valid email.");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('https://revogue.onrender.com/api/user/sendotp', { email });
            setMessage(response.data.message);
            if (response.data.success) {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/signup', { state: { email } });
                }, 1000);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error sending OTP");
            setLoading(false);
            console.error(error);
        }
    };

    const messageColor = message === "OTP sent successfully" ? 'text-green-500' : 'text-red-500';

    return (
        <div className="min-h-screen bg-transparent text-black  dark:text-white transition-colors duration-300">
            <div className="text-center pt-20">
                <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 mx-auto text-blue-500" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-4xl tracking-tight mb-10">First Generate Your OTP</h2>
            </div>

            <div className="flex justify-center my-2 mx-4 md:mx-0">
                <div className="w-full max-w-md rounded-lg shadow-md p-6 bg-gray-100 dark:bg-neutral-900">
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-sm font-bold mb-2" htmlFor='Email'>
                            Email address
                        </label>
                        <input
                            className="appearance-none block w-full bg-white dark:bg-neutral-800 text-black dark:text-white border border-gray-300 dark:border-neutral-700 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                const newEmail = e.target.value;
                                setEmail(newEmail);
                                validateEmail(newEmail);
                            }}
                            placeholder="Enter your email"
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="flex justify-between mb-4">
                        <Link to="/" className="text-blue-500 text-sm hover:underline">Home</Link>
                    </div>

                    <button
                        onClick={handleSendOtp}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        {loading ? 'Wait...' : 'Send OTP'}
                    </button>

                    {message && (
                        <div className={`pt-6 text-center text-xl font-light ${messageColor}`}>
                            <p>{message}</p>
                        </div>
                    )}

                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Otp;

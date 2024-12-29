import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
        validateField(e.target.name, e.target.value);
    };

    // Validate individual fields
    const validateField = (name, value) => {
        let error = '';
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address.';
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                error = 'Password must be at least 6 characters long.';
            }
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Validate entire form
    const validateForm = () => {
        validateField('email', userData.email);
        validateField('password', userData.password);
        return !errors.email && !errors.password;
    };

    // Check for user authentication
    useEffect(() => {
        const user = localStorage.getItem('user_token');
        if (user) navigate('/dashboard');
    }, [navigate]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fix the errors in the form.');
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await axios.post('https://reqres.in/api/login', userData);
            localStorage.setItem('user_token', data.token);
            toast.success('Login Successful');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
                <h2 className="text-lg font-bold mb-4">Login</h2>

                {/* Email Input */}
                <div className="mb-4 relative">
                    <label htmlFor="email" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.email || userData.email ? 'text-[#3998c0] -top-3' : 'text-gray-700 top-2'}`}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        onFocus={() => setIsFocused({ ...isFocused, email: true })}
                        onBlur={() => setIsFocused({ ...isFocused, email: userData.email.length > 0 })}
                        required
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder=" "
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div className="mb-4 relative">
                    <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.password || userData.password ? 'text-[#3998c0] -top-3' : 'text-gray-700 top-2'}`}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        onFocus={() => setIsFocused({ ...isFocused, password: true })}
                        onBlur={() => setIsFocused({ ...isFocused, password: userData.password.length > 0 })}
                        required
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder=" "
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#3998c0] text-white py-2 rounded-md hover:bg-[#2d799a] transition duration-200"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {isLoading && <Loader />}
        </div>
    );
};

export default Login;

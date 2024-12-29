import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    // Check for user authentication
        useEffect(() => {
            const user = localStorage.getItem('user_token');
            if (user) navigate('/dashboard');
        }, [])

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const { data } = await axios.post('https://reqres.in/api/login', userData);
            console.log(data)
            localStorage.setItem("user_token", data.token);
            toast.success("Login Successfull")
            navigate('/dashboard');
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-bold mb-4">Login</h2>

                {/* email Input */}
                <div className="mb-4 relative">
                    <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.email || userData.email ? 'text-[#3998c0] -top-3' : 'text-gray-700 top-2'}`}>
                        User Name
                    </label>
                    <input
                        type="string"
                        id="email"
                        name='email'
                        value={userData.email}
                        onChange={handleChange}
                        onFocus={() => setIsFocused({ ...isFocused, email: true })}
                        onBlur={() => setIsFocused({ ...isFocused, email: userData.email.length > 0 })}
                        required
                        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] transition-all duration-200 ${isFocused.email || userData.email ? 'border-blue-500' : 'border-gray-300'}`}
                        placeholder=" "
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4 relative">
                    <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.password || userData.password ? 'text-[#3998c0] -top-3' : 'text-gray-700 top-2'}`}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={userData.password}
                        onChange={handleChange}
                        onFocus={() => setIsFocused({ ...isFocused, password: true })}
                        onBlur={() => setIsFocused({ ...isFocused, password: userData.password.length > 0 })}
                        required
                        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] transition-all duration-200 ${isFocused.password || userData.password ? 'border-[#3998c0]' : 'border-gray-300'}`}
                        placeholder=" "
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#3998c0] text-white py-2 rounded-md hover:bg-[#3998c0] transition duration-200"
                // disabled={userData.email && userData.password}
                >
                    Login
                </button>
            </form>
            {isLoading ? <Loader /> : ""}
        </div>
    );
};

export default Login;
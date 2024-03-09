// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

const [ token , setToken ]=useState(false);

useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
        setToken(true);
    }
}, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://backend-api-lilac.vercel.app/login', formData);

        const token  = response.data.token;
        sessionStorage.setItem('token', token);
        setToken(true)
        console.log(response.data);
    } catch (error) {
        console.error('Error Login user:', error.response.data.error);
    }
    console.log("formddata:",formData);
  };

  return (
    
    <>
            {token ? (
                <Home />
            ) : (
                <div className="max-w-sm mx-auto mt-8 border border-gray-300 rounded-md p-4">
                    <h1 className="text-3xl font-bold underline p-4">Login Form</h1>
                    <form onSubmit={handleSubmit} action='post'>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Sign In
                        </button>
                        
                    </form>
                </div>
            )}
        </>
  );
};

export default LoginForm;

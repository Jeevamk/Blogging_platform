// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import Home from './Home';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    status: 'active', 
  });

  const [ isSubmitted , setIsSubmitted ] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://backend-api-lilac.vercel.app/', formData);
        console.log(response.data.message)
        setIsSubmitted(true)

    } catch (error) {
        console.error('Error registering user:', error.response.data.error);
    }
    console.log(formData);
  };

  const token = sessionStorage.getItem('token');
  if (token) {
    return <Home />
  }

  return (
    <>
    {isSubmitted ? (
        <LoginForm />
      ) : (
    <div className="max-w-sm mx-auto mt-8 border border-gray-300 rounded-md p-4">
    <h1 className="text-3xl font-bold underline p-4">
      Registration Form
    </h1>
      <form onSubmit={handleSubmit} action='post'>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input type="hidden" name="status" value="active" />
        
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 p-3">
                      Do you have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                  </p>
      </form>
      </div>
)}
    </>
  );
};

export default RegistrationForm;

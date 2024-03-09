// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Home = () => {
  const [formData, setFormData] = useState({
    title: '',
    discription: '',
    createdDate: '', 
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userToken = sessionStorage.getItem('token');
        console.log('userToken',userToken);
        const response = await axios.post('https://backend-api-lilac.vercel.app/blog/add_blog', formData, { headers: { Auth : userToken } });
        console.log(response.data.message)
        console.log("Added...");

        
    } catch (error) {
        console.error('Error registering user:', error.response.data.error);
    }
    console.log(formData);
  }


  return (
    <> 
    <div className="max-w-sm mx-auto mt-8 border border-gray-300 rounded-md p-4">
    <h1 className="text-3xl font-bold underline p-4">
      Create Blog
    </h1>
      <form onSubmit={handleSubmit} action='post'>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          name="discription"
          value={formData.discription}
          onChange={handleChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          placeholder="Date"
          name="createdDate"
          value={formData.createdDate}
          onChange={handleChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
           
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Blog
        </button>
        
      </form>
      </div>

    </>
  );
};

export default Home;

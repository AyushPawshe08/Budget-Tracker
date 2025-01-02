import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { loginUser } from '../services/api'; // Import the API function for login


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook to navigate to other routes after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
        // Call the login API
        const response = await loginUser(formData);
  
        if (response.status === 200) {
          // Login successful, redirect to dashboard
          navigate('/dashboard');
        } else {
          // Display error message if login fails
          setError(response.data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        // Show error message if login fails
        setError(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Login failed. Please check your credentials.'
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      <form onSubmit={handleSubmit} method='POST' className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Login</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>} {/* Display error */}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-gray-700">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;


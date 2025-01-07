import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../services/api'; // Import the API function for signup

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    pic: '', // For Cloudinary URL
  });
  const [loading, setLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false); // Track image upload state
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook to navigate to other routes after signup

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Ensure we're working with a single file
    if (!file) return;

    setIsImageLoading(true); // Start image upload
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'BudgetTracker'); // Make sure this matches your Cloudinary settings
    data.append('cloud_name', 'djzsehi5y'); // Use your Cloudinary cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/djzsehi5y/image/upload', {
        method: 'POST',
        body: data,
      });
      const uploadedImageURL = await res.json();
      setFormData((prevState) => ({
        ...prevState,
        pic: uploadedImageURL.url, // Set the URL of the uploaded image in formData
      }));
      setIsImageLoading(false); // Image upload complete
    } catch (err) {
      console.error('Error uploading image:', err);
      setIsImageLoading(false); // Stop loading state even on error
      setError('Failed to upload image. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      setLoading(true);
      await signupUser(formData); // Call the signup API
      localStorage.setItem('user', JSON.stringify(formData)); // Save user data locally
      navigate('/dashboard'); // Redirect after signup
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data : 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} method="POST" className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Sign Up</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>} {/* Display error */}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

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

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {isImageLoading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading || isImageLoading} // Disable the button while loading or uploading
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

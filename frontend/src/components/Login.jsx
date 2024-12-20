import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Login</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
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
}

export default Login;

import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check authentication status based on cookie or token
  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  //   if (token) {
  //     setIsAuthenticated(true); // If token exists, user is authenticated
  //   }

    // Fetch data from the backend API if authenticated
  //   if (isAuthenticated) {
  //     fetch('http://localhost:5000/api/users') // Replace with your API URL
  //       .then((response) => response.json())
  //       .then((result) => setData(result))
  //       .catch((error) => console.error('Error fetching data:', error));
  //   }
  // }, [isAuthenticated]); // Effect runs when authentication status changes

  // const handleLogout = () => {
  //   // Clear the cookie (token) and set authentication state to false
  //   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //   setIsAuthenticated(false);
  // };

  return (
    <div>
      <Routes>
        {/* Home Page rendered directly */}
        <Route path="/" element={<Home />} />
        {/* Login and Signup only accessible if user is not authenticated */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path= '/income' element={<Income/>}/>
        <Route path= '/expenses' element={<Expenses/>}/>
      </Routes>
    </div>
  );
};

export default App;

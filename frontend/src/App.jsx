import React, { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Income from './components/Income'
import Expenses from './components/Expenses'

const App = () => {
  const [data ,setData] = useState(null);
  const[isAuthenticated , setIsAuthenticated] = useState(false)
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path= '/income' element={<Income/>}/>
        <Route path= '/expenses' element={<Expenses/>}/>
      </Routes>
    </div>
  )
}

export default App

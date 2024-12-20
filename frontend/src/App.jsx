import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App

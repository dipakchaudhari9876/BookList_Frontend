import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
  return (
    <div className="Header">
    <h1>Book's</h1>
    <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Header
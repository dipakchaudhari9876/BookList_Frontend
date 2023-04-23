import React, { useState } from 'react'
import './auth.css'
import Login from '../Login/Login'
import Register from '../Register/Register'

const Auth = () => {
    const [login,setLogin] = useState(true)
  return (
    <div className="main" style={{backgroundColor:login?"rgb(219, 104, 16)":"rgb(113, 183, 15)"}}>
        <div className="auth">
            {login?<Login temp={setLogin}/>:<Register temp={setLogin}/>}
        </div>
    </div>
  )
}

export default Auth
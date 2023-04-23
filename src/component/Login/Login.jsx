import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const url = process.env.REACT_APP_API

const Login = ({temp}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        try{
            const login = await axios.post(`${url}/api/user/login`,{username,password})
            alert(login.data.message)
            console.log(login.data.token)
            localStorage.setItem("token",JSON.stringify(login.data.token))
            navigate('/home')
            setError("")
            setPassword("")
            setUsername("")
        }catch(err){
            setError(err.response.data.error)
        }
    }
    return (
        <div className="login">
            <h1>LOGIN</h1>
            <form onSubmit={onSubmitHandler}>
                <input className='input' type="text" placeholder='USERNAME' onChange={(e) => {
                    setUsername(e.target.value)
                }}
                    value={username}
                />
                <div className="pass">
                    <input className='input' type="password" placeholder='PASSWORD'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                </div>
                {error && <p>{error}</p> }
                <button type="submit">LOGIN</button>
            </form>
            <div className="bottom">
                <p className='path'>Don't have an account? <span onClick={()=>{
                    temp(false)
                }}>register</span></p>
                <p className='forgot'>Forgot password</p>
            </div>
        </div>
    )
}

export default Login
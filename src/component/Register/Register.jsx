import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
const url = process.env.REACT_APP_API

const Register = ({ temp }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [Cpassword, setCpassword] = useState("")
    const [error, setError] = useState("")

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const register = await axios.post(`${url}/api/user/register`, { username, password, Cpassword })
            alert(register.data.message)
            temp(true)
            setError("")
            setPassword("")
            setUsername("")
            setCpassword("")
        } catch (err) {
            setError(err.response.data.error)
        }
        console.log({ username, password, Cpassword })
    }
    return (
        <div className="login">
            <h1>Register</h1>
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
                <div className="pass">
                    <input className='input' type="password" placeholder='CONFIRM PASSWORD'
                        onChange={(e) => {
                            setCpassword(e.target.value)
                        }}
                        value={Cpassword}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">REGISTER</button>
            </form>
            <div className="bottom">
                <p className='loginPath' onClick={() => {
                    temp(true)
                }}>Already have an account</p>
            </div>
        </div>
    )
}

export default Register
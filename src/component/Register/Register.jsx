import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const url = process.env.REACT_APP_API


const Register = ({ temp }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [Cpassword, setCpassword] = useState("")
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)
    const [cshow, setCShow] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!username || !password || !Cpassword) {
            setError("Fill all the details")
        } else if (password !== Cpassword) {
            setError("passwords does not match")
        } else {
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
        }
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
                    <input className='input' type={!show ? "password" : "text"} placeholder='PASSWORD'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                    {!show && <VisibilityIcon style={{ fontSize: "20px" }} className='visible_icon' onClick={() => {
                        setShow(!show)
                    }} ></VisibilityIcon>}
                    {show && <VisibilityOffIcon style={{ fontSize: "20px" }} className='visible_icon'
                        onClick={() => {
                            setShow(!show)
                        }}
                    ></VisibilityOffIcon>}
                </div>
                <div className="pass">
                    <input className='input' type={!cshow ? "password" : "text"} placeholder='CONFIRM PASSWORD'
                        onChange={(e) => {
                            setCpassword(e.target.value)
                        }}
                        value={Cpassword}
                    />
                    {!cshow && <VisibilityIcon style={{ fontSize: "20px" }} className='visible_icon' onClick={() => {
                        setCShow(!cshow)
                    }} ></VisibilityIcon>}
                    {cshow && <VisibilityOffIcon style={{ fontSize: "20px" }} className='visible_icon'
                        onClick={() => {
                            setCShow(!cshow)
                        }}
                    ></VisibilityOffIcon>}
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
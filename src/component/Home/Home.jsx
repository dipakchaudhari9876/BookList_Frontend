import React, { useEffect, useState } from 'react'
import './home.css'
import Display from '../Display/Display'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../Authentication/check'
import Header from '../Header/Header'
const url = process.env.REACT_APP_API

const Home = () => {
    const [data,setData] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        
        const getData  = async()=>{
            const token = getToken()
            const data = await axios.get(`${url}/api/book/getall`,{
                params:{token:token}
            })
            setData(data.data)
            
        }
        getData()
    },[])
    return (
        <>
        <Header/>
        <div className="Home">
            <h1>Book List</h1>
            <div className="home_btn">
                <button onClick={()=>{
                    navigate(`/create/${'hello'}`)
                }}>+ Add New Book</button>
            </div>
            {data && <div className="cont">
                {data.map((item)=>{
                    return(
                        <Display key={item._id} {...item}/>
                    )
                })}
            </div>}

        </div>
        </>
    )
}

export default Home
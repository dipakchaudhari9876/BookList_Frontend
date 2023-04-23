import React, { useEffect, useState } from 'react'
import './create.css'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import { getToken } from '../../Authentication/check'
import Header from '../Header/Header'
const url = process.env.REACT_APP_API

const Create = () => {
    const [title, setTitle] = useState("")
    const [isbn,setIsbn] = useState("")
    const [author,setAuthor] = useState("")
    const [describe,setDescribe] = useState("")
    const [date,setDate] = useState("")
    const [publisher,setPub] = useState("")
    const [error,setError] = useState("")
    const [id,setId] = useState("")
    const navigate = useNavigate()

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        try{
            const data = {title,isbn,author,describe,date,publisher,userId:id}
            const create = await axios.post(`${url}/api/book/create`,data)
            alert(create.data.message)
            navigate('/home')
        }catch(err){
            setError(err.respone.data.error)
        }
    }

    useEffect(()=>{
        const getId =async()=>{
            const token = getToken()
            const id = await axios.get(`${url}/api/book/getid`,{
                params:{token:token}
            })
            setId(id.data.id)
        }
        getId()
    },[])
    return (
        <>
        <Header/>
        <div className="create">
            <div className="container">
                <button className='btn show_btn' onClick={()=>{navigate('/home')}} >Show Book List</button>
                <h1>Add Book</h1>
                <h3>Create New Book</h3>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" className='create_input'
                    placeholder='Title of the book'
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }} 
                            value={title}
                        />
                    <input type="text" className='create_input'
                    placeholder='ISBN'
                        onChange={(e) => {
                            setIsbn(e.target.value)
                        }} 
                            value={isbn}
                        />
                    <input type="text" className='create_input'
                    placeholder='Author'
                        onChange={(e) => {
                            setAuthor(e.target.value)
                        }} 
                            value={author}
                        />
                    <input type="text" className='create_input'
                    placeholder='Describe this book'
                        onChange={(e) => {
                            setDescribe(e.target.value)
                        }} 
                            value={describe}
                        />
                    <input type="date" className='create_input'
                    placeholder='Published date'
                        onChange={(e) => {
                            setDate(e.target.value)
                        }} 
                            value={date}
                        />
                    <input type="text" className='create_input'
                    placeholder='Publisher of these book'
                        onChange={(e) => {
                            setPub(e.target.value)
                        }} 
                            value={publisher}
                        />
                        {error && <p>{error}</p>}
                    <button className="btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Create
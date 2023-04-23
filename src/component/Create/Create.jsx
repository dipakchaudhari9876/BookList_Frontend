import React, { useEffect, useState } from 'react'
import './create.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../../Authentication/check'
import Header from '../Header/Header'
const url = process.env.REACT_APP_API

const Create = () => {
    const [title, setTitle] = useState("")
    const [isbn, setIsbn] = useState("")
    const [author, setAuthor] = useState("")
    const [describe, setDescribe] = useState("")
    const [date, setDate] = useState("")
    const [publisher, setPub] = useState("")
    const [error, setError] = useState("")
    const [uid, setUId] = useState("")
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!title || !isbn || !author || !describe || !date || !publisher) {
            setError("Fill all the details")
        } else {

            if (update) {
                const data = { title, isbn, author, describe, date, publisher, userId: uid }
                const update = await axios.put(`${url}/api/book/update/${id}`, data)
                alert(update.data.message)
                navigate('/home')
                setError("")
            } else {
                try {
                    const data = { title, isbn, author, describe, date, publisher, userId: uid }
                    const create = await axios.post(`${url}/api/book/create`, data)
                    alert(create.data.message)
                    navigate('/home')
                    setError("")
                } catch (err) {
                    setError(err.respone.data.error)
                }
            }
        }

    }

    useEffect(() => {
        const getId = async () => {
            const token = getToken()
            const id = await axios.get(`${url}/api/book/getid`, {
                params: { token: token }
            })
            // console.log(id.data.id)
            setUId(id.data.id)
        }
        getId()
        if (id !== 'hello') {
            setUpdate(true)
            const bookdata = async (id) => {
                const data = await axios.get(`${url}/api/book/booklist/${id}`)
                if (data) {
                    setTitle(data.data.title)
                    setIsbn(data.data.isbn)
                    setAuthor(data.data.author)
                    setDescribe(data.data.describe)
                    setDate(data.data.date)
                    setPub(data.data.publisher)
                }
            }
            bookdata(id)
        }
    }, [])
    return (
        <>
            <Header />
            <div className="create">
                <div className="container">
                    <button className='btn show_btn' onClick={() => { navigate('/home') }} >Show Book List</button>
                    <h1>{update ? "UPDATE BOOK" : "Add BOOK"}</h1>
                    <h3>{update ? "UPDATE INFO" : "Create New Book"}</h3>
                    <form onSubmit={onSubmitHandler}>
                        <label htmlFor='title'>Title</label>
                        <input type="text" id='title' className='create_input'
                            placeholder='Title of the book'
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            value={title}
                        />
                        <label htmlFor='isbn'>ISBN</label>
                        <input type="text" id='isbn' className='create_input'
                            placeholder='ISBN'
                            onChange={(e) => {
                                setIsbn(e.target.value)
                            }}
                            value={isbn}
                        />
                        <label htmlFor='author'>Author</label>
                        <input type="text" className='create_input'
                            id='author'
                            placeholder='Author'
                            onChange={(e) => {
                                setAuthor(e.target.value)
                            }}
                            value={author}
                        />
                        <label htmlFor='describe'>Describe</label>

                        <input type="text" className='create_input'
                            id='describe'
                            placeholder='Describe this book'
                            onChange={(e) => {
                                setDescribe(e.target.value)
                            }}
                            value={describe}
                        />
                        <label htmlFor='date'>Date</label>

                        <input type="date" className='create_input'
                            id='date'
                            placeholder='Published date'
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                            value={date}
                        />
                        <label htmlFor='publish'>Publisher</label>

                        <input type="text" className='create_input'
                            id='publish'
                            placeholder='Publisher of these book'
                            onChange={(e) => {
                                setPub(e.target.value)
                            }}
                            value={publisher}
                        />
                        {error && <p>{error}</p>}
                        <button className="btn" type="submit">{update ? "UPDATE" : "SUBMIT"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Create
import React, { useEffect, useState } from 'react'
import './show.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header/Header'
const url = process.env.REACT_APP_API


const Show = () => {
  const [data, setData] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  const onClickDel = async () => {
    try {
      const remove = await axios.delete(`${url}/api/book/remove/${id}`)
      alert(remove.data.message)
      navigate('/home')
    } catch (err) {
      console.log(err)
    }
  }

  const onClickEdit = () => {
    navigate(`/create/${id}`)
  }
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${url}/api/book/booklist/${id}`)
      setData(data.data)
    }
    getData()
  }, [])
  return (
    <>
      <Header />
      <div className="show">
        <div className="show_cont">
          <div className="show_btn">
            <button onClick={() => {
              navigate('/home')
            }}>Show Book List</button>
          </div>
          <h1>Book's Record</h1>
          <h4>View Book's Record</h4>
          {data && <div className="show_details">
            <div className="details">
              <p>Title</p>
              <p>{data.title}</p>
            </div>
            <div className="details">
              <p>Author</p>
              <p>{data.author}</p>
            </div>
            <div className="details">
              <p>ISBN</p>
              <p>{data.isbn}</p>
            </div>
            <div className="details">
              <p>Publisher</p>
              <p>{data.publisher}</p>
            </div>
            <div className="details">
              <p>Published Date</p>
              <p>{data.date}</p>
            </div>
            <div className="details">
              <p>Description</p>
              <p>{data.describe}</p>
            </div>
          </div>}
          <div className="show_bottom">
            <button className='del_btn' onClick={onClickDel}>Delete Book</button>
            <button className='edit_btn'
              onClick={onClickEdit}
            >Edit Book</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show
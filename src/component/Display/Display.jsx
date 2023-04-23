import React from 'react'
import './display.css'
import book from './../../Assets/images/book cover.jpg'
import { useNavigate } from 'react-router-dom'
const Display = ({_id,author,describe,title}) => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate(`/show/${_id}`)
  }
  return (
    <div className="display" onClick={handleClick}>
      <img src={book}  alt='Book Cover'/>
      <div className="display_btm">
        <h4>{title}</h4>
        <h5>{author}</h5>
        <p>{describe}</p>
      </div>
    </div>
  )
}

export default Display
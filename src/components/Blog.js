import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeblog, removeblog } from '../reducers/blogReducer'
import '../styles/blog.css'


const Blog = ({ blog, showDelete }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeblog(blog.id))
    }
  }

  const details = () => (
    <div>
      <div>{blog.url} </div>
      <div>{blog.likes} <button onClick={() => dispatch(likeblog(blog))}>like</button></div>
      {showDelete && <div><button onClick={handleRemove}>remove</button></div>}
    </div>
  )

  return (
    <div className='borderStyle'>
      {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button>
      {showDetails && details()}
    </div>
  )
}

export default Blog

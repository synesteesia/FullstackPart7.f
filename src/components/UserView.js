import React from 'react'
import { useParams } from 'react-router-dom'


const UserView = ({ users }) => {
  const username = useParams().id
  const user = users.find(u => u.username === username)

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Blogs added</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>
            {blog.title}
          </li>)}
      </ul>
    </div>
  )
}
export default UserView
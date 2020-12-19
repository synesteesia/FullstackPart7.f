import React from 'react'
import { Link } from 'react-router-dom'

const UserForm = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead><tr><th></th><th>Blogs created</th></tr></thead>
        <tbody>
          {users.map(u =>
            <tr key={u.username}>
              <td><Link to={`/users/${u.username}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}
export default UserForm
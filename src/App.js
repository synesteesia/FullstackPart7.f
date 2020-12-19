import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import UserForm from './components/usersForm'
import UserView from './components/UserView'
import Togglable from './components/Togglable'
import BlogForm from './components/blogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeblogs } from './reducers/blogReducer'
import { initializeusers } from './reducers/usersReducer'
import { login, logout, initUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeblogs())
  }, [])

  useEffect(() => {
    dispatch(initializeusers())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const blogFormRef = useRef()

  const loggedInElement = () => (
    <p>{user.name} logged in <button id="logout-button" onClick={() => dispatch(logout())}>Log out</button></p>
  )

  return (


    <div>
      {user ? <h2>blogs</h2> : <h2>Log in</h2>}
      <Notification />

      {!user &&
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      {user && loggedInElement()}

      <Router>
        <Switch>
          <Route path="/users/:id">
            <UserView users={users} />
          </Route>

          <Route path="/users">
            <UserForm users={users} />
          </Route>

          <Route path='/'>
            {user && <Togglable buttonLabel='add blog' ref={blogFormRef} >
              <BlogForm />
            </Togglable>}

            {user && blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                showDelete={blog.user.username === user.username}
              />
            )}
          </Route>
        </Switch>
      </Router>



    </div>
  )
}

export default App


import loginService from '../services/login'
import blogService from '../services/blogs'
import { errorNotification } from './notificationReducer'


const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

export const login = (username, password) => {
  return dispatch => {
    loginService.login({
      username, password
    }).then((user) => {
      dispatch({
        type: 'LOGIN',
        data: user
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    }).catch(() => {
      dispatch(errorNotification('Wrong credentials', 5))
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
}

export const initUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
}

export default loginReducer
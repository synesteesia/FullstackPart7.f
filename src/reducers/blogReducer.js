import blogService from '../services/blogs'
import { successNotification, errorNotification } from './notificationReducer'


const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD':
    return [...state, action.data]
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    ).sort((a, b) => b.likes - a.likes)
  case 'INIT':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const createblog = (content) => {
  return dispatch => {
    blogService.create(content)
      .then((newBlog) => {
        dispatch({
          type: 'ADD',
          data: newBlog
        })
        dispatch(successNotification(`New blog '${newBlog.title}' by '${newBlog.author}' added`, 5))
      }).catch(() => {
        dispatch(errorNotification(`Something went wrong when adding new blog '${content.title}' by '${content.author}'`, 5))
      })
  }
}

export const likeblog = (blog) => {
  return async dispatch => {
    const changedblog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, changedblog)
    dispatch({
      type: 'LIKE',
      data: changedblog
    })
  }
}

export const removeblog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export default blogReducer

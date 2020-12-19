let previousNotification = ''
const initialState = { message: null, className: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SUCCESS':
    return { message: action.data, className: 'success' }
  case 'ERROR':
    return { message: action.data, className: 'fail' }
  case 'EMPTY':
    return initialState
  default:
    return state
  }
}

export const emptyNotification = () => {
  return {
    type: 'EMPTY',
  }
}

export const successNotification = (content, timeout) => {
  return async dispatch => {
    clearTimeout(previousNotification)
    dispatch({
      type: 'SUCCESS',
      data: content
    })
    previousNotification = setTimeout(() => dispatch(emptyNotification()), timeout * 1000)
  }
}

export const errorNotification = (content, timeout) => {
  return async dispatch => {
    clearTimeout(previousNotification)
    dispatch({
      type: 'ERROR',
      data: content
    })
    previousNotification = setTimeout(() => dispatch(emptyNotification()), timeout * 1000)
  }
}

export default notificationReducer
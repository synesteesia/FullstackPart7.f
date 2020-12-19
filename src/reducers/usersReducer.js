import userService from '../services/users'

const initialState = []

const userReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'INITUSERS':
    return action.data
  default:
    return state
  }
}

export const initializeusers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

export default userReducer
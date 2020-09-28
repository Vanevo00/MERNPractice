import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/login')
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const loginUser = (userData) => async (dispatch) => {
  try {
    const {
      data: {
        token
      }
    } = await axios.post('api/users/login', userData)
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
  } catch(err) {
    console.log('action error', err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}

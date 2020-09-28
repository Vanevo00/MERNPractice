import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading())
    const response = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch(err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  }
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

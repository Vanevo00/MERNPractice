import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types'

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

export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile', profileData)
    history.push('/dashboard')
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
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

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete('/api/profile')
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    } catch(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
  }
}

export const addExperience = (expData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/experience', expData)
    history.push('/dashboard')
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const addEducation = (eduData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/education', eduData)
    history.push('/dashboard')
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const deleteExperience = (id) => async(dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    })
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

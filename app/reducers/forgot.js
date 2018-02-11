import axios from 'axios';
const FORGOT = 'FORGOT'
const EMAILSENT = 'EMAILSENT';
const RESET = 'RESET';
const DISPLAY = 'DISPLAY';
import { browserHistory, Link } from 'react-router'

export const forgotPasswordBool = () => ({type: 'FORGOT'})
export const forgotPasswordBoolFalse = () => ({type: EMAILSENT})
export const displayForgotForm = () => ({type: DISPLAY })

export const confirmReset = (status) => ({type: RESET, status})

const INTITIALSTATE = {password: false, confirmation: false, reset: null, resetform: false, display: false}

const forgot = (passwordState = INTITIALSTATE, action) => {
  switch (action.type) {
    case FORGOT:
    return { ...passwordState, password: true, display: false }
    case EMAILSENT:
    return { ...passwordState, password: false, confirmation: true, resetform: true  }
    case RESET:
    return { ...passwordState, password: false, confirmation: false, reset: action.status, resetform: true, display: false  }
    case DISPLAY:
    return {...passwordState, display: true }
  }
  return passwordState
}


export const forgotPassword = (email) => {
  return dispatch =>
    axios.post('/forgotpassword', { email })
      .then((res) => console.log('forgot'))
}

export const resetPassword = (credentials) => {
  return dispatch =>
    axios.post('/forgotpassword/reset', credentials)
      .then((res) => {
                browserHistory.push('/')

        dispatch(confirmReset(res.data))
      })
      .catch(err => console.log(err))
}

export const forgotdisplay = dispatch =>
  dispatch =>
    dispatch(displayForgotForm())

export default forgot

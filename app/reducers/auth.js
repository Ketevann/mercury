import axios from 'axios'

export const AUTHENTICATED = 'AUTHENTICATED'

const inistialState = {
  clicked: true
}
const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:

      return action.user
  }
  return state
}

export const authenticated = user =>
   ({ type: AUTHENTICATED, user })



export const login = (email, password) => {
  console.log('loglog')
  return dispatch =>
    axios.post('/api/auth/login/local',
      { email, password })
      .then(() => dispatch(whoami()))
     .catch(() => dispatch(whoami()))
}

export const signup = (email, password, name) =>
  dispatch =>
    axios.post('/api/auth/signup',
      { email, password, name })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))


export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  {

    return dispatch =>
    axios.get('/api/auth/whoami')
      .then(response =>{
        var user
         console.log("in whoami&***********")
         if (response.data === '') user = null
         else user = response.data
        dispatch(authenticated(response.data))
      })
      .catch(failed => dispatch(authenticated(null)))
  }

export default reducer

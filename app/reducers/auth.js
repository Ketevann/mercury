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

export const authenticated = user => {
  return { type: AUTHENTICATED, user }
}


export const login = (email, password) =>
   dispatch =>
    axios.post('/api/auth/login/local', {email, password})

       .then((res) => {
        return dispatch(whoami())
        })
       .catch((err) => console.log(err))


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

// export const userExpenses = () =>
//   dispatch =>
//     axios.get('api/budget')
//       .then((res) => dispatch(create(res.data)))
//       .catch(console.error())



export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        var user
        if (response.data === '') user = null
        else user = response.data
        dispatch(authenticated(user))
      })
      .catch(err => console.log(err))


export default reducer

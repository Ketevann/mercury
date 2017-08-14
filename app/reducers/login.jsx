
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

export const Login = () => ({type: 'LOGIN'})
export const Signup = () => ({type: SIGNUP })



const inistialState = {
  signUp: false,
  login: true,
}



const statusReducer = (status=inistialState, action) => {

  switch (action.type) {
  case LOGIN:

    return Object.assign({}, status, {login: true, signUp: false})

  case SIGNUP:

    return Object.assign({}, status, {signUp: true, login: false})
  }
  return status
}


export default statusReducer

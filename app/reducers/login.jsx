
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const FORGOT_DISPLAY = 'FORGOT_DISPLAY'

export const Login = () => ({ type: 'LOGIN' })
export const Signup = () => ({ type: SIGNUP })
export const forgotDisplay = () => ({ type: FORGOT_DISPLAY })




const inistialState = {
  signUp: false,
  login: true,
  forgot: false
}



const statusReducer = (status = inistialState, action) => {

  switch (action.type) {
    case LOGIN:

      return Object.assign({}, status, { login: true, signUp: false, forgot: false })

    case SIGNUP:

      return Object.assign({}, status, { signUp: true, login: false, forgot: false })
    case FORGOT_DISPLAY:
      return Object.assign({}, status, { signUp: false, login: false, forgot: true })
  }

  return status
}


export default statusReducer

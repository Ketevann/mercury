
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const FORGOT_DISPLAY = 'FORGOT_DISPLAY'
export const CANCEL = 'CANCEL'
export const PRESSED = 'PRESSED'


export const Login = () => ({ type: 'LOGIN' })
export const Signup = () => ({ type: SIGNUP })
export const forgotDisplay = () => ({ type: FORGOT_DISPLAY })
export const cancelButtonPress = () => ({ type: CANCEL })
export const buttonPress = () => ({ type: PRESSED })






const inistialState = {
  signUp: false,
  login: true,
  forgot: false,
  pressed: false
}



const statusReducer = (status = inistialState, action) => {

  switch (action.type) {
    case LOGIN:

      return Object.assign({}, status, { login: true, signUp: false, forgot: false })

    case SIGNUP:

      return Object.assign({}, status, { signUp: true, login: false, forgot: false })
    case FORGOT_DISPLAY:
      return Object.assign({}, status, { signUp: false, login: false, forgot: true})
      case PRESSED:
      return {...status, pressed: true}
     case CANCEL:
     console.log('cancel')
      return {...status, pressed: false}
  }

  return status
}


export default statusReducer

import { combineReducers } from 'redux'
import {responsiveStateReducer} from 'redux-responsive'

const rootReducer = combineReducers({
  auth: require('./auth').default,

  plaid: require('./plaid').default,

  modal: require('./modal').default,

  budget: require('./budget').default,

  email: require('./email').default,

  status: require('./login').default,

  menu: require('./dropdown').default,

  forgot: require('./forgot').default,

  browser: responsiveStateReducer
})

export default rootReducer

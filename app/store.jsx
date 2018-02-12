import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import {responsiveStoreEnhancer} from 'redux-responsive'

import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'
import {reducer} from './reducers/plaid'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    responsiveStoreEnhancer,
    applyMiddleware(
      thunkMiddleware
     // createLogger({collapsed: true})
    )
  )
)

export default store

// Set the auth info at start
store.dispatch(whoami())

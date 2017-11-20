import React from 'react'

export const Login = ({ login, signup }) => (
<div>
  <form onSubmit={evt => {
    evt.preventDefault()

    login(evt.target.email.value, evt.target.password.value)
  } }>
    <input name="email" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
  <form onSubmit={evt => {
    evt.preventDefault()

    signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
  } }>
    <input name="name" />
    <input name="email" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
      <br/>

</div>
)

import {login, signup, thirdPartyLogin} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)

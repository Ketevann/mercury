import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { forgotDisplay } from '../reducers/login'
import { login } from 'APP/app/reducers/auth'
import store from '../store'





export class LoginForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onForgotEnter = this.onForgotEnter.bind(this)
    this.state = { logged: null }

  }

  handleSubmit(evt) {
    evt.preventDefault()
    const email = evt.target.email.value,
      password = evt.target.password.value


    this.props.login(email, password)
    this.setState({ logged: true })

  }
  onForgotEnter(){
    store.dispatch(this.props.forgotDisplay())
  }
  render() {
    return (
      <div id="login-form">
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <input className="credentials" name="email" placeholder="Email" required />
          <br></br>
          <input className="credentials" name="password" type="password" placeholder="Password" required />
          <br></br>
          <br></br>
          <div id="forgot-link">
            <div id="forgot-password" onClick={() => this.onForgotEnter()}>Forgot Password?</div>
          </div>
          <input className="btn" type="submit" value="Login" />
        </form>
        {this.state.logged === true && this.props.user.auth === '' ?
          <div style={{ color: 'red' }}>User Does not Exist</div>
          : null}
        <a href="/api/auth/login/google"> <button className="google"></button> </a>

      </div>)
  }
}


export default connect(
  (user) => ({ user }),
  { login, store, forgotDisplay },
)(LoginForm)




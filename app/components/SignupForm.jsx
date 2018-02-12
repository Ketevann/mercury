import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { modalShow, modalHide, Login, Signup, forgot, newPassowrd } from '../reducers/modal'
import { connect } from 'react-redux'
import { login, signup } from 'APP/app/reducers/auth'
import { buttonPress } from '../reducers/login'

import store from '../store'

class SignupForm extends React.Component {

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { signedUp: null, error: null }
  }

  handleClick = () => store.dispatch(modalShow())
  handleClose = () => store.dispatch(modalHide())
  handleSubmit(evt) {
    evt.preventDefault()
    if (evt.target.password.value.length < 6) {
      this.setState({ error: "The password needs to be at least 6 character long" })
    }
    else {
      this.setState({ error: null })
      this.props.signup(evt.target.email.value, evt.target.password.value, evt.target.name.value)
      this.setState({ signedUp: true })
      store.dispatch(buttonPress())
    }
  }
  render() {
    { console.log('props', this.props) }
    return (
      <div id="signup-form">
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <input className="credentials" name="name" placeholder="Name" required />
          <br></br>
          <input className="credentials" name="email" placeholder="Email" required />
          <br></br>
          <input onChange={() => this.setState({ error: null })} className="credentials" name="password" type="password" placeholder="Password" required />
          <br></br>
          <br></br>
          <input style={{ 'background-color': '#53ecd0' }} className="btn" type="submit" value="Sign Up" />
        </form>
        {this.state.error ?
          <div
            className="password-error"
            style={{ color: 'red' }}>{this.state.error}</div> : null}
        {this.state.signedUp === true && this.props.user.auth === '' ?
          <div style={{ color: 'red' }}>Incorrect Input</div>
          : null}
      </div>)
  }
}

export default connect(
  (user) => ({ user }),
  { signup },
)(SignupForm)



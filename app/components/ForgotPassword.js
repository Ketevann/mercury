import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { forgotPassword, forgotPasswordBoolFalse } from '../reducers/forgot'
import { buttonPress } from '../reducers/login'
import store from '../store'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ForgotPassword extends React.Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
      sent: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const { forgot } = this.props
    return (
      <div id="login-form">
          <form action method="post" name="Login_Form" className="form-signin" onSubmit={evt => {
              evt.preventDefault()
              this.props.forgotPassword(evt.target.email.value)
              store.dispatch(forgotPasswordBoolFalse())
              this.setState({sent: "The password reset link has be sent to your email"})

              this.openModal()
            }}>
            <h3 className="form-signin-heading">Please Enter Your Email</h3>

          <input onChange={() => this.setState({sent: null })} className="credentials" name="email" placeholder="Email" required />
          <br></br>

          <div id="forgot-link">

          </div>
             {this.state.sent?
            <div id="email-sent-confirm">{this.state.sent}</div>
            : null}
          <input className="btn" type="submit" value="Submit" />
        </form>
        {this.state.logged === true && this.props.user.auth === '' ?
          <div style={{ color: 'red' }}>User Does not Exist</div>
          : null}

      </div>







    )
  }
}


export default connect(
  ({ forgot }) => ({ forgot }),
  { forgotPassword, forgotPasswordBoolFalse },
)(ForgotPassword)

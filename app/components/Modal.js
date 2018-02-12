import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { modalShow, modalHide } from '../reducers/modal'
import { Login, Signup, cancelButtonPress, buttonPress } from '../reducers/login'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login, signup } from 'APP/app/reducers/auth'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import store from '../store'
import ForgotPassword from './ForgotPassword'

class Modal extends React.Component {

  handleClick = () => {
    store.dispatch(cancelButtonPress())
    //store.dispatch(modalShow())
  }
  handleClose = () => {
    store.dispatch(cancelButtonPress())
    store.dispatch(modalHide())
  }

  render() {
    const { login } = this.props.status
    return (
      <div className="modal" onClick={this.handleClick}>{
        this.props.modal.showModal && !this.props.status.pressed ?
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog className="dialog" onClose={this.handleClose}>
              <div className="clear"></div>
              <br></br>
              <br></br>
              {this.props.status.login ?
                <div id="authenticate-form">

                  <span className="alignright" >Not a member? </span>
                  <h5> <a onClick={() => store.dispatch(this.props.Signup())} className="alignright">Sign up</a></h5>
                  <br></br>
                  <h2 clssName="clear">Member Login</h2>
                  <LoginForm login={login} />


                </div> :
                this.props.status.signUp && !this.props.status.login ?
                  <div id="authenticate-form">
                    <span className="alignright" >Already a member? </span>
                    <h5> <a href="#" onClick={() => store.dispatch(this.props.Login())} className="alignright">Login</a></h5>

                    <br></br>
                    <br></br>
                    <h2 clssName="clear">Join Mercury</h2>
                    <SignupForm />
                  </div> :
                  this.props.status.forgot ?
                    <div id="authenticate-form">
                      <h5>Back to <a href="#" onClick={() => store.dispatch(this.props.Login())} className="alignright">Login</a></h5>
                      <ForgotPassword />
                      <br></br>
                      <br></br>
                    </div>

                    : null}
              <br></br>

            </ModalDialog>
          </ModalContainer>
          : null}
      </div>)
  }
}


export default connect(
  ({ modal, status, user }) => ({ modal: modal, status: status, user: user }),
  { modalShow, modalHide, Signup, Login },
)(Modal)

import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {modalShow, modalHide} from '../reducers/modal'
import {Login, Signup} from '../reducers/login'

import { connect } from 'react-redux'
import { login, signup } from 'APP/app/reducers/auth'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import store from '../store'


class Modal extends React.Component {

 handleClick = () => store.dispatch(modalShow())
  handleClose = () => store.dispatch(modalHide())
  render() {
    const { login } = this.props.status
    {console.log(this.props, 'props')}
    return (
      <div className="modal" onClick={this.handleClick}>{
        this.props.modal.showModal ?
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog className="dialog" onClose={this.handleClose}>
              <div className="clear"></div>
              <br></br>
              <br></br>
              {this.props.status.login ?
                <div>
                  <h5> <a onClick={() => store.dispatch(this.props.Signup())} className="alignright">Sign up</a></h5>
                  <span className="alignright" >Not a member? </span>
                  <br></br>
                  <h2 clssName="clear">Member Login</h2>
                  <LoginForm login={login} />

                </div> :
                <div>
                  <h5> <a href="#" onClick={() => store.dispatch(this.props.Login())} className="alignright">Login</a></h5>
                  <span className="alignright" >Already a member? </span>
                  <br></br>
                  <br></br>
                  <h2 clssName="clear">Join Mercury</h2>
                  <SignupForm />
                </div>}
              <br></br>
              {this.props.user === null?
             <div style={{color: 'red'}}>User Does not Exist</div>
             :null}
              <a href="/api/auth/login/google"> <button className="google"></button> </a>
            </ModalDialog>
          </ModalContainer>
          : null}
      </div>)
  }
}


export default connect(
  ({ modal, status, user }) => ({ modal: modal, status: status, user: user }),
  {modalShow, modalHide, Signup, Login},
)(Modal)

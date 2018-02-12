import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import store from '../store'
import {modalShow, modalHide} from '../reducers/modal'
import { cancelButtonPress, buttonPress } from '../reducers/login'

import Modal from './Modal'



const Front = (props) => {
  return (
    <div className="homepage flex">
    <div className="text-wrapper">
      <h2 className="tex header "> SPEND YOUR MONEY WISELY</h2>
      <h4 className="text ">Mercury helps you keep track of your budget and spending</h4>
      <h4 className="hometext "> and alerts you when you go off-track</h4>
      <div className="signupbutton">
      <button onClick={() =>
       { store.dispatch(cancelButtonPress())
        store.dispatch(props.modalShow()) }} type="button" className="btn btn-warning signup">Sign Up</button>
      </div>
      {props.modal.signup ? <Modal /> :null}
    </div>
    </div>
    )
  }



export default connect(
  ({ modal }) => ({modal: modal}),
  {modalShow, cancelButtonPress},
)(Front)

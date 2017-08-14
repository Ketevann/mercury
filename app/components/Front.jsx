import {connect} from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import store from '../store'
import {modalShow, modalHide} from '../reducers/modal'
import Modal from './Modal'



const Front = (props) => {
  return (
    <div className="homepage">
      <h2 className="tex header "> SPEND YOUR MONEY WISELY</h2>
      <h4 className="text ">Mercury helps you keep track of your budget and spending</h4>
      <h4 className="hometext "> and alerts you when you go off-track</h4>
      <button onClick={() => store.dispatch(props.modalShow()) } type="button" className="btn btn-warning signup">Sign Up</button>
      {props.modal.signup ? <Modal /> :null}
    </div>)
  }



export default connect(
  ({ modal }) => ({modal: modal}),
  {modalShow},
)(Front)

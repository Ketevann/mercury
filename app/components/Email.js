import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from "react-router";
import { budgetEmail, prodEmail, prodCont, emailAdder, emailRemover } from '../reducers/email'

class Email extends Component {
  constructor(props) {
    super(props)
    this.onBudgetClick = this.onBudgetClick.bind(this)
    this.onProdClick = this.onProdClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
   // this.onEmailSubmit = this.onEmailSubmit.bind(this)
    //this.onButtonClick = this.onButtonClick.bind(this)
  }

  onBudgetClick = (evt) => {
    var status = { budgetUpdates: evt.target.value }
    this.props.budgetEmail(status)
  }

  onProdClick = (evt) => {
    var status = { prodUpdates: evt.target.value }
    this.props.prodEmail(status)
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    var info = {
      thing: evt.target.thing.value,
      amount: evt.target.dollar.value
    }
    evt.target.thing.value = ''
    evt.target.dollar.value = ''
    this.props.prodCont(info)
  }

  // onEmailSubmit = (evt) => {
  //   evt.preventDefault();
  //   var info = {
  //     email: evt.target.email.value
  //   }
  //   evt.target.email.value = ''
  //   this.props.emailAdder(info)
  // }
  // onButtonClick = (evt) => {
  //   this.props.emailRemover({ email: evt.target.value })
  // }

  render() {
    return (
      <div className="email">
        <h4 id="email-header" >Enable email notifications about your success! </h4>
        <div className="email-wrapper">

          <div className="email-flex-col">
          <div className="enable-budget-wrapper">
          <div className="enable-name" style={{ 'margin-bottom': '0px' }}>Enable Budget Updates:</div>
          <div id="select-buttons">
            <select value={this.props.budgetUpdates} onChange={(evt) => {
              this.onBudgetClick(evt)
            }}>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
          </div>
          </div>
          <div className="enable-purchase-wrapper">
          <div className="enable-name" style={{ 'padding-top': '0px' }}>Enable Specified Purchase Updates:</div>
          <div id="update-purchase-buttons">
            <select onChange={(evt) => { this.onProdClick(evt) }} value={this.props.prodUpdates} >
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
          </div>
          </div>
          <hr></hr>
        <h4>Specified Purchase Details</h4>
        <form onSubmit={(evt) => {
          this.onSubmit(evt)
        }}>

          <div></div>
          <input type="text" name="thing" placeholder='Purchase Location (Starbcuks)' />
          <br></br>
          <div className="dollar"></div>
          <input type="text" name="dollar" placeholder='Dollar Amount per Month (50)' />
          <br></br>
          <br></br>
          <button className="btn email-button" type="submit">Submit!</button>

        </form>
        </div>
        </div>
      </div>

    )
  }
}


export default connect(
  (state) => {
    return ({
      budgetUpdates: state.email.budgetUpdates,
      prodUpdates: state.email.prodUpdates,
      thing: state.email.thing,
      amount: state.email.amount,
      emails: state.email.emails
    })
  },
  { budgetEmail, prodEmail, prodCont, emailAdder, emailRemover },
)(Email)

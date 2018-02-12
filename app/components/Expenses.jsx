import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from 'react-redux'
import store from '../store'
import { logout } from 'APP/app/reducers/auth'
import { fetchTransactions } from '../reducers/plaid'
import Chart from './Chart'
import DisplayBudget from './DisplayBudget'
import { connectPlaid } from '../reducers/plaid'
import Modal from 'react-modal'
import spendingCategories from '../../spendingCategories'
const { categories } = spendingCategories
import { ArrayforChart, objectForChart, reducer } from '../../utils/functions'

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

const expenseCategory = {
  food: 0,
  bills: 0,
  healthcare: 0,
  transportation: 0,
  education: 0,
  emergencies: 0,
  entertainment: 0,
  other: 0
}




export class Expenses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      submit: null
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitTransactionDate = this.submitTransactionDate.bind(this)

  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false, submit: false });
  }
  componentDidMount() {
    if (this.props.plaid.transactions.error) {
      this.setState({ submit: true })
    }
    else {
      this.setState({ submit: false })
    }
  }
  submitTransactionDate(evt) {
    evt.preventDefault()
    const dates = {
      startDate: evt.target.startDate.value,
      endDate: evt.target.endDate.value
    }
    this.props.fetchTransactions(dates.startDate, dates.endDate)
    this.setState({ submit: true })
  }

  //sums up the total budget and transactions

  render() {
    let data = []
    const { budget, modal, modalShow, plaid } = this.props
    let transactions = this.props.transactions.transactions,
      budgetsum = 0,
      val

    {/*if the user is not logged in return null*/ }
    if (!this.props.user) return null

    {/*declaring variables */ }
    let budgetArr = [],
      plaidArr = [],
      transacArr = [],
      expensesSum = 0,
      found = false,
      sum = 0


    if (transactions !== undefined && budget.budget) {
      //if there is a transaction object, sums up the money spent on each category and converts the object into an array of objects
      const transactionObject = objectForChart(transactions, expenseCategory)
      transacArr = ArrayforChart(transactionObject, budget.budget, [], 0)
    }
    // if (budget.budget) // turns the budget object into an array of objects
    //   plaidArr = this.ArrayforChart(budget.budget, [], 0)
    return (
      <div className="expenses">
        <div className="form-container calendar">
          <div className="expenseheaderwrapper">
            <h4 className="expensedheader">Set your</h4><Link className="expensedheader linkword" to="/addexpenses"> budget </Link>
            <h4 className="expensedheader"> and your </h4><a className="expensedheader linkword" onClick={this.props.connectPlaid}>account </a> <h4 className="expensedheader">to compare your monthly spending with your budgeting goal</h4>
          </div>
          <div className="form-wrapper">
            <h5 id="selecdates">Select transaction dates:</h5>
            <form className="pure-form" onSubmit={(evt) => this.submitTransactionDate(evt)}>
              <div className="dates">
                <div className="start-date-wrapper">
                  <div id="startdate">
                    <label for="startDate">Start Date:  </label>
                  </div>
                  <div id="startdateinput">
                    <input onChange={() => this.setState({ submit: null })} className="pure-input-rounded" name="startDate" type="date" />
                  </div>
                </div>
                <br />
                <div className="end-date-wrapper">
                  <div id="enddate">
                    <label for="endDate">End Date:  </label>
                  </div>
                  <div id="enddateinput">

                    <input onChange={() => this.setState({ submit: null })} className="pure-input-rounded" name="endDate" type="date" />
                  </div>
                </div>
                <br />
              </div>
              <div id="button-wrapper">
                <button className="pure-button" id="transacbutton" type="submit" className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
        {this.state.submit && this.props.plaid.transactions.error ?
          <div id="no-transac-error">Please link you bank account</div>
          : null}
        <div id="chart">
          {budget.budget !== null && transacArr.length > 0 ?
            <div>
              <h4 id="totalexpense">Total Budget: ${sum = this.reducer(budget.budget).toFixed(2)} </h4>
              <h4 id="totalexpense">Total Expenses: ${expensesSum = this.reducer(expenseCategory).toFixed(2)} </h4>
              <Chart data={transacArr} />
            </div>
            : null}
        </div>
        <DisplayBudget transactions={transactions} budget={budget.budget} />
      </div>
    )
  }
}


export default connect(
  ({ auth, budget, plaid }) => ({
    transactions: plaid.transactions, user: auth, budget, plaid,
  }),
  { fetchTransactions, connectPlaid },
)(Expenses)






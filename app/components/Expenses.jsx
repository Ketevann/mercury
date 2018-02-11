import React, { Component } from 'react';
import { Link } from "react-router";
import { connect } from 'react-redux'
import store from '../store'
import { logout } from 'APP/app/reducers/auth'
import { fetchTransactions } from '../reducers/plaid'
import Chart from './Chart'
import DisplayBudget from './DisplayBudget'
import { connectPlaid } from '../reducers/plaid'


var categories = {
  bills: ["Bank Fees", "Overdraft", "ATM", "Late Payment", "Fraud Dispute", "Foreign Transaction", "Wire Transfer", "Insufficient Funds", "Cash Advance", "Excess Activity", "Cash Advance", "Interest Earned", "Interest", "Interest Charged", "Credit Card", "Rent", "Payment", "Loan", "Rent"],



  education: ["Education", "Education", "Vocational Schools", "Education", "Tutoring and Educational Services", "Education", "Primary and Secondary Schools", "Education", "Fraternities and Sororities", "Education", "Driving Schools", "Education", "Dance Schools", "Education", "Culinary Lessons and Schools", "Education", "Computer Training", "Education", "Colleges and Universities", "Education", "Art School", "Education", "Adult Education"],

  emergencies: ["Law Enforcement", "Police Stations", "Fire Stations", "Correctional Institutions", "Physicians", "Ear, Nose and Throat", "Physicians", "Dermatologists", "Physicians", "Cardiologists", "Healthcare", "Physicians", "Anesthesiologists"],

  entertainment: ["Bar", "Wine Bar", "Bar", "Sports Bar", "Bar", "Hotel Lounge", "Breweries", "Internet Cafes", "Nightlife", "Nightlife", "Strip Club", "Nightlife", "Night Clubs", "Nightlife", "Karaoke", "Nightlife", "Jazz and Blues Cafe", "Nightlife", "Hookah Lounges", "Nightlife", "Adult Entertainment", "Recreation", "Theatrical Productions", "Symphony and Opera", "Sports Venues", "Social Clubs", "Psychics and Astrologers", "Party Centers", "Music and Show Venues", "Museums", "Movie Theatres", "Fairgrounds and Rodeos", "Entertainment", "Dance Halls and Saloons", "Circuses and Carnivals", "Casinos and Gaming", "Bowling", "Billiards and Pool", "Art Dealers and Galleries", "Arcades and Amusement Parks", "Arts and Entertainment", "Aquarium", "Athletic Fields", "Baseball", "Basketball", "Batting Cages", "Boating", "Campgrounds and RV Parks", "Canoes and Kayaks", "Combat Sports"],


  food: ["Winery", "Food and Drink", "Vegan and Vegetarian", "Food and Drink", "Turkish", "Thai", "Swiss", "Sushi", "Steakhouses", "Spanish", "Seafood", "Scandinavian", "Portuguese", "Pizza", "Moroccan", "Middle Eastern", "Mexican", "Mediterranean", "Latin American", "Korean", "Juice Bar", "Japanese", "Italian", "Indonesian", "Indian", "Ice Cream", "Greek", "German", "Gastropub", "French", "Food Truck", "Fish and Chips", "Filipino", "Fast Food", "Falafel", "Food and Drink", "Restaurants", "Chinese", "Caribbean", "Cajun", "Cafe", "Burrito", "Burgers", "Breakfast Spot", "Brazilian", "Barbecue", "Bakery", "Bagel Shop", "Australian", "Asian", "American", "African", "Afghan"],

  healthcare: ["Psychologists", "Pregnancy and Sexual Health", "Podiatrists", "Physical Therapy", "Optometrists", "Nutritionists", "Nurses", "Mental Health", "Medical Supplies and Labs", "Hospitals, Clinics and Medical Centers", "Emergency Services", "Dentists", "Counseling and Therapy", "Chiropractors", "Blood Banks and Centers", "Alternative Medicine", "Healthcare", "Healthcare Services", "Acupuncture"],

  transportation: ['Taxi', 'Cab', 'Subway', 'Travel', 'Transportation Centers', 'Tolls and Fees', 'Rail', 'Public Transportation Services', 'Parking', 'Car Service', 'Airlines and Aviation Services', 'Airports']
}


export class Expenses extends Component {
  constructor(props) {
    super(props)
    this.submitTransactionDate = this.submitTransactionDate.bind(this)
    this.ArrayforChart = this.ArrayforChart.bind(this)
    this.objectForChart = this.objectForChart.bind(this)
  }

  submitTransactionDate(evt) {
    evt.preventDefault()
    const dates = {
      startDate: evt.target.startDate.value,
      endDate: evt.target.endDate.value
    }
    this.props.fetchTransactions(dates.startDate, dates.endDate)
  }


  //converts the object in to the array of object with x and y coordinates for a chart
  ArrayforChart(expenseCategory, budget, plaidArr, expensesSum) {
    var plaid = []
    Object.keys(expenseCategory).map(key => {
      if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
        if (Number(expenseCategory[key]) > 0)
          expensesSum += Number(expenseCategory[key])
        plaid.push({ name: key, budget: budget[key], expense: expenseCategory[key] })
      }
    })
    return plaid
  }
  //sums the total money spent on each category of the transactions object from the PLAID API
  objectForChart(transaction, expenseCategory) {
    let found = false, val
    transaction.map(obj => {
      if (obj.amount > 0) val = obj.amount
      else val = 0
      Object.keys(categories).map(keys => {
        if (obj.category) {
          if (categories[keys].indexOf(obj.category[0]) !== -1) {
            found = true
            if (expenseCategory[keys] === 0) {
              expenseCategory[keys] = val
            } else expenseCategory[keys] += val
          }
        }
      })
      if (!found) {
        {/*if the transaction category did not match any keys in the categories object, it is placed in other*/ }
        expenseCategory['other'] += val
      }
    })

    return expenseCategory
  }
  //sums up the total budget and transactions
  reducer(obj) {
    return Object.keys(obj).reduce((total, num) => {
      if (isNaN(obj[num]) === false) {
        total += Number(obj[num])
      }
      return total
    }, 0)
  }
  render() {
    let data = [], data2 = []
    const { budget, modal, modalShow, plaid } = this.props
    let transactions = this.props.transactions.transactions, budgetsum = 0, val

    {/*if the user is not logged in return null*/ }
    if (!this.props.user) return null

    {/*declaring variables */ }
    let budgetArr = [], plaidArr = [], transacArr = [], expensesSum = 0, found = false,
      sum = 0,
      expenseCategory = {
        food: 0,
        bills: 0,
        healthcare: 0,
        transportation: 0,
        education: 0,
        emergencies: 0,
        entertainment: 0,
        other: 0
      }

    if (transactions !== undefined && budget.budget) {
      //if there is a transaction object, sums up the money spent on each category and convets the object into an array of objects
      const transactionObject = this.objectForChart(transactions, expenseCategory)
      transacArr = this.ArrayforChart(transactionObject, budget.budget, [], 0)
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
                  <input className="pure-input-rounded" name="startDate" type="date" />
                </div>
                </div>
                <br />
                <div className="end-date-wrapper">
                  <div id="enddate">
                    <label for="endDate">End Date:  </label>
                  </div>
                  <div id="enddateinput">

                    <input className="pure-input-rounded" name="endDate" type="date" />
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
        <div id="chart">
          {budget.budget !== null && transacArr.length > 0 ?
            <div>
              <h4 id="totalexpense">Total Budget: ${sum = this.reducer(budget.budget).toFixed(2)} </h4>
              <h4 id="totalexpense">Total Expenses: ${expensesSum = this.reducer(expenseCategory).toFixed(2)} </h4>
              <Chart data={transacArr} />


            </div>
            : null}</div>
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






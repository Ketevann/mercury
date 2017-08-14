import { connect } from 'react-redux'
import React from 'react'
import BudgetForm from './BudgetForm'
import { Link } from "react-router";


const Budget = () =>  {
    return(
      <div className="budget">
        <div className="expenses-btns">
          <Link to="/addexpenses">
            <div className="budget-button">
              <p className="btnText">EDIT BUDGET</p>
              <div className="btnTwo">
                <p className="btnText2">GO!</p>
              </div>
            </div>
          </Link>
          <span></span>
          <Link to="/myexpenses">
            <div className="budget-button">
              <p className="btnText">MY BUDGET</p>
              <div className="btnTwo">
                <p className="btnText2">GO!</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

    )
  }



export default Budget

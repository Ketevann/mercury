import React from 'react';
import Chart from './Chart'
import TransactionsTable from './TransactionsTable'


const DisplayBudget = (props) => {
    return (
  <div className="expense">
  <h3>Budget Expenses</h3>
    {props.budget ?
      <table className="table table-bordered budgettable">
        <thead className="habits" >
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Cost</th>
          </tr>
        </thead>
        {
          Object.keys(props.budget).map((key, index) => {
            if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id'){
              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{key}</td>
                    <td>{props.budget[key]}</td>
                  </tr>
                </tbody>)
            }
          })
        }
      </table> : null}
    {props.transactions?
    <div className="transactable">
      <h3 >  Expenses </h3>
      <table className="table table-bordered transactable">
        <thead className="habits" >
          <tr>
            <th>#</th>
            <th>Location</th>
            <th>Type</th>
            <th>Cost</th>
          </tr>
        </thead>
          {
          props.transactions && props.transactions.map((item, index) => {
              return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  {item.category ? (<td>{item.category[0]}</td>) : (<td>N/A</td>)}
                  <td>{item.amount}</td>
                </tr>
              </tbody>)
            })
          }
        </table>
    </div> :null}
   </div>
  )
}

export default DisplayBudget

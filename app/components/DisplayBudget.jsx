import React from 'react';
import Chart from './Chart'
import TransactionsTable from './TransactionsTable'


const DisplayBudget = (props) => {
  return (
    <div className="expense">
      {props.budget ?
        <h3>Budget</h3>
        : null}
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
              if (key !== 'created_at' && key !== 'updated_at' && key !== 'user_id' && key !== 'id') {
                return (
                  <tbody>
                    <tr>
                      <td scope="row">{index + 1}</td>
                      <td>{key}</td>
                      <td>{props.budget[key]}</td>
                    </tr>
                  </tbody>)
              }
            })
          }
        </table> : null}
      {props.transactions ?
        <h3>Expenses</h3>
        : null}
      {props.transactions ?

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
                    <td scope="row">{index + 1}</td>
                    <td>{item.name}</td>
                    {item.category ? (<td>{item.category[0]}</td>) : (<td>N/A</td>)}
                    <td>{item.amount}</td>
                  </tr>
                </tbody>)
            })
          }
        </table>
        : null}
    </div>
  )
}

export default DisplayBudget

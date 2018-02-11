import axios from 'axios'

const initialState = { budget: false }

export const CREATEBUDGET = 'CREATEBUDGET'


const create = (budget) => ({ type: CREATEBUDGET, budget })

const budgetReducer = (budget = initialState, action) => {
  switch (action.type) {
    case CREATEBUDGET:
      return Object.assign({}, budget, { budget: action.budget })
  }
  return budget
}

//creates budget
export const budgetCreate = (credentials) =>
  dispatch =>
    axios.post('/api/budget', credentials)
      .then((res) => {
        console.log(res, 'TOKEEN')
        dispatch(create(res.data))
      })
      .catch(console.error())

//gets budget
export const userExpenses = () =>
  dispatch =>
    axios.get('api/budget')
      .then((res) => dispatch(create(res.data)))
      .catch(console.error())

export default budgetReducer


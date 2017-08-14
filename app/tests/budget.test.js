// import chai, { expect } from 'chai'
// chai.use(require('chai-enzyme')())
// chai.use(require('sinon-chai'))
// import budgetReducer, { CREATEBUDGET, create, budgetCreate } from '../reducers/budget'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter';
// import * as actions from '../reducers/budget'
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'

// const mockAxios = new MockAdapter(axios);
// //const mockStore = configureMockStore(middlewares);

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)


// describe('async actions', () => {
//   var MockAdapter = require('axios-mock-adapter');
//   // This sets the mock adapter on the default instance
//   var mock = new MockAdapter(axios);

//   afterEach(() => {
//     mock.reset()
//   })
//   it('should create an action userExpenses', () => {
//     const expectedActions =
//       [
//         {
//           type: CREATEBUDGET, budget: { todos: ['do something'] }

//         }
//       ]
//     mock.onGet('/api/budget').reply(200, { todos: ['do something'] })
//     const store = mockStore({ todos: [] })
//     return store.dispatch(actions.userExpenses())
//       .then((response) => {
//         expect(store.getActions()).to.deep.equal(expectedActions)
//       })
//   })
//   it('should create an action budgetCreate', () => {

//     const expectedActions =
//       [
//         {
//           type: CREATEBUDGET, budget: { todos: ['do something'] }

//         }
//       ]

//     mock.onPost('/api/budget').reply(200, { todos: ['do something'] })
//     const store = mockStore({ todos: [] })
//     return store.dispatch(actions.budgetCreate({ emailname: 'email', password: 'password' }))
//       .then((response) => {
//         expect(store.getActions()).to.deep.equal(expectedActions)
//       })
//   })
// })


// describe('budget reducer test', () => {
//   it('should return initial state', () => {
//     expect(budgetReducer(undefined, {})).to.deep.equal({
//       budget: false
//     })
//   })
//   it('should handle CREATEBUDGET', () => {
//     const action = {
//       type: CREATEBUDGET,
//       budget: 'text'
//     }
//     expect(budgetReducer({}, action)).to.deep.equal({
//       budget: action.budget
//     })
//   })
// })


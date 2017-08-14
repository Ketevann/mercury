// import chai, { expect } from 'chai'
// chai.use(require('chai-enzyme')())
// chai.use(require('sinon-chai'))
// import budgetReducer, { CREATEBUDGET, create, budgetCreate } from '../reducers/budget'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter';
// import * as actions from '../reducers/auth'
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'

// const mockAxios = new MockAdapter(axios);
// //const mockStore = configureMockStore(middlewares);

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)


// // describe('async actions', () => {
// //  var MockAdapter = require('axios-mock-adapter');
// //   // This sets the mock adapter on the default instance
// //   var mockAxios = new MockAdapter(axios);

// //   afterEach(() => {
// //     mockAxios.reset()
// //   })

// // })











// describe('async actions', () => {
//   var MockAdapter = require('axios-mock-adapter');
//   // This sets the mock adapter on the default instance
//   var mockAxios = new MockAdapter(axios);

//   // beforeEach(() => {

//   // })
//   afterEach(() => {
//     mockAxios.reset()
//   })
//   it('creates AUTHENTICATED when fetching users has been done', () => {
//     mockAxios.onAny('/api/auth/login/local')
//       .reply(200, { body: { todos: ['do something'] } })
//     const store = mockStore({ todos: [] })
//     return store.dispatch(actions.login()).then(() => {
//       mockAxios.reset()
//       mockAxios.onGet('api/auth/whoami')
//         .reply(200, { user: ['currentUser'] })
//       const expectedActions = [
//         { type: actions.AUTHENTICATED, user: { user: ['currentUser'] } }
//       ]
//       const store = mockStore({ user: [] })
//       return store.dispatch(actions.whoami()).then(() => {
//         expect(store.getActions()).to.deep.equal(expectedActions)
//       })
//     })
//   })
// })






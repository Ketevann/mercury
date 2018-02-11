import chai, { expect } from 'chai'
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
import budgetReducer, { CREATEBUDGET, create, budgetCreate } from '../reducers/budget'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

import * as actions from '../reducers/auth'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockAxios = new MockAdapter(axios);
//const mockStore = configureMockStore(middlewares);

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('async actions', () => {
  var MockAdapter = require('axios-mock-adapter');
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset()
  })
  it('should create an action userExpenses', () => {
    const expectedActions =
      [
        {
          type: CREATEBUDGET, budget: { todos: ['do something'] }

        }
      ]
    mock.onPost('/api/auth/login/local').reply(200, { todos: ['do something'] })
    const store = mockStore({ todos: [] })
    return store.dispatch(actions.login())
      .then((response) => {

  //    console.log(store.getActions(), ' GET ACTIONS')
  //        expect(store.getActions()).to.deep.equal('6')


      mock.reset()
      mock.onGet('api/auth/whoami')
        .reply(200, { user: ['currentUser'] })
      const expectedActions = [
        { type: actions.AUTHENTICATED, user: { user: ['currentUser'] } }
      ]
      const store = mockStore({ user: [] })
      return store.dispatch(actions.whoami())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
       })
      .catch(error => console.log('ERROR!!!!', error))
   })
  })
})






import React from 'react';
import chai, { expect } from 'chai'
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
import statusReducer, {Login, Signup, LOGIN, SIGNUP} from '../reducers/login'

describe('actions', () => {
  it('should create an action to login', () => {
    const expectedAction = {
      type: LOGIN,
    }
    expect(Login()).to.deep.equal(expectedAction)
  })
  it('should create an action to signup', () => {
    const expectedAction = {
      type: SIGNUP,
    }
    expect(Signup()).to.deep.equal(expectedAction)
  })
})


describe('status reducer', () => {
  it('should return the initial state', () => {
    expect(statusReducer(undefined, {})).to.deep.equal(
      {
        signUp: false,
        login: true,
      }
    )
  })

  it('should handle LOGIN and SIGNUP', () => {
    expect(
      statusReducer({}, {
        type: LOGIN,

      })
    ).to.deep.equal(
      {
       login: true, signUp: false,
      }
    )

    expect(
      statusReducer(
        {},
        {
          type: SIGNUP,

        }
      )
    ).to.deep.equal(
      {
        signUp: true, login: false
      },

    )
  })
})

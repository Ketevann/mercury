import chai, { expect } from 'chai'
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
import modalReducer, { HIDEMODAL, SHOWMODAL, modalShow, modalHide } from '../reducers/modal'

describe('modal test', () => {
  it('should create an action to showmodal', () => {
    const expectedAction = {
      type: SHOWMODAL
    }
    expect(modalShow()).to.deep.equal(expectedAction)
  })
  it('should create an action to hidemodal', () => {
    const expectedAction = {
      type: HIDEMODAL
    }
    expect(modalHide()).to.deep.equal(expectedAction)
  })
  describe('reducer test', () => {
    it('should return an initial state', () => {
      expect(modalReducer(undefined, {})).to.deep.equal(
        {
          showModal: false
        }
      )
    })
     it('should handle SHOWMODAL and HIDEMODAL', () => {
       expect(modalReducer({},{type: SHOWMODAL})).to.deep.equal({
         showModal: true
       })
       expect(modalReducer({},{type: HIDEMODAL})).to.deep.equal({
         showModal: false
       })
     })
  })
})

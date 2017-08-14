import axios from 'axios'
import {whoami} from './auth'

const inistialState = {
  showModal: false,
}

export const SHOWMODAL = 'SHOWMODAL'
export const HIDEMODAL = "HIDEMODAL"


/*            Action Creators               */
export const modalShow = () =>  ({type: SHOWMODAL})
export const modalHide = () => ({type: HIDEMODAL})


/*             Reducer               */
const modalReducer = (modal=inistialState, action) => {
  switch (action.type) {
  case SHOWMODAL:
    return Object.assign({}, modal, {showModal: true})

  case HIDEMODAL:

    return Object.assign({}, modal, {showModal: false})
  }
  return modal
}

/*            Dispatcher               */


export default modalReducer

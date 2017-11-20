// import React from 'react';
// import {Loginform} from '../components/Loginform.jsx'
// import chai, { expect } from 'chai'
// chai.use(require('chai-enzyme')())
// chai.use(require('sinon-chai'))
// import { createStore } from 'redux'
// import configureStore from 'redux-mock-store'
// import { mount, render, shallow } from 'enzyme';
// import { connect, Provider } from 'react-redux'
// import { sinon, spy } from 'sinon';


// global.expect = expect
// global.sinon = sinon
// global.spy = spy

// global.mount = mount
// global.render = render
// global.shallow = shallow

// /* dom.js */
// const { JSDOM } = require('jsdom');

// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
// const { window } = jsdom;

// function copyProps(src, target) {
//   const props = Object.getOwnPropertyNames(src)
//     .filter(prop => typeof target[prop] === 'undefined')
//     .map(prop => Object.getOwnPropertyDescriptor(src, prop));
//   Object.defineProperties(target, props);
// }

// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js',
// };
// copyProps(window, global);

// describe('<Loginform />', () => {
//   let mockStore, wrapper, store
// const mockState = {
//         myValue: 1,
//         otherValue: 'test'
//     };
//      mockStore = configureStore();
//      store = mockStore(mockState);
//   //beforeEach('render the root', () => {

//     wrapper = shallow(
//       <Loginform />
//     );
//   //})


//   it('have an email input', () => {
//     expect(wrapper.find('input[name="email"]')).to.have.length(1)

//   });
//   it('should have a password input', () => {
//     expect(wrapper.find('input[name="password"]')).to.have.length(1)
//     expect(wrapper.find('input[name="password"]')).to.have.attr('type').equals('password')
//   })

//   it('has a login button', () => {
//     const submit = wrapper.find('input[type="submit"]')
//     expect(submit).to.have.length(1)
//   })




//   // describe('Form', () => {
//   //   it('submit event when click submit', () => {
//   //     const callback = spy();
//   //     const wrapper = mount(<InputForm />);
//   //     wrapper.find('[type="submit"]').get(0).click();
//   //     expect(callback).to.have.been.called();
//   //   });
//   // });

//   describe('when submitted', () => {
//     const login = spy()
//  login.type = 'TYPE'
//     wrapper = shallow(
//       <Loginform login={login} />
//     );

//     const submitEvent = {
//       preventDefault: spy(),
//       target: {
//         email: { value: 'bones@example.com' },
//         password: { value: '12345' },
//       }
//     }



//     // beforeEach('submit', () => {
//     //   login.reset()

//     //   submitEvent.preventDefault.reset()
//     //   const form = wrapper.find('form').simulate('submit', submitEvent)
//     // })


//     it('calls preventDefault *********', () => {
//      const form = wrapper.find('form').simulate('submit', submitEvent)

//       expect(submitEvent.preventDefault).to.have.been.called
//     })
//     it('calls props.login with credentials', () => {
//       const form = wrapper.find('form').simulate('submit', submitEvent)
//       expect(login).to.have.been.calledWith(
//         submitEvent.target.email.value,
//         submitEvent.target.password.value
//       )


//     })


//   })







// });

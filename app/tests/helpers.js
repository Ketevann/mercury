import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
import {createStore} from 'redux'


import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';

global.expect = expect
global.sinon = sinon
global.spy = spy

global.mount = mount
global.render = render
global.shallow = shallow

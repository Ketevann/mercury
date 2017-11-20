import React, { Component } from 'react';
import { Link } from "react-router";
import Login from './Login'
import Modal from './Modal'
import { connect } from 'react-redux'
import { modalShow } from "../reducers/modal"
import store from '../store'
import { logout } from 'APP/app/reducers/auth'
import { connectPlaid } from '../reducers/plaid'
import { browserHistory } from 'react-router'
import { menuShow, setMenuToTrue } from "../reducers/dropdown"
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';




// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.clickHandlerLogout = this.clickHandlerLogout.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

  handleClick = () => this.props.menuShow()
  clickHandlerLogout() {
    //logs out and redirects to home
    this.props.logout()
    browserHistory.push('/')
  }

  render() {
    var disp, displayStyle
    //toggle; if menu is true the menu dropsdown by setting the navbar to  inline-block
    if (this.props.menu.showMenu === true)
      disp = 'inline-block'
    else disp = 'none'

    const divStyle = {
      display: disp
    };
    //toggle; if the screen is medium/large navarbar is always inline-block
    if (store.getState().browser.is.small !== true && store.getState().browser.is.extraSmall !== true) divStyle.display = 'inline-block'


    //if the screensize is small or extra small the menu icon is visible, otherwise it is hidden
    if (store.getState().browser.is.small === true || store.getState().browser.is.extraSmall === true) displayStyle = 'inline'
    else displayStyle = 'none'


    const iconStyle = {
      display: displayStyle
    };

    return (
      <Navbar  inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <img className="logo menuicon" src={'./logo3.png'} />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
              {this.props.user ?
                <Nav>
              <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>

                <Link className="menuicon" id="home" to="/home">Home</Link>
                </MenuItem>
                <MenuItem eventKey={3.1}>
                <a className="menuicon" onClick={this.props.connectPlaid}>Connect to My Account</a>
                </MenuItem>
                <MenuItem eventKey={3.1}>
                <Link className="menuicon" id="link" to="/emailSettings">Email Settings</Link>
                </MenuItem>
                <MenuItem eventKey={3.1}>
                <Link className="menuicon" id="link" to="/budget">Budget</Link>
                </MenuItem>
                </NavDropdown>

                <NavItem eventKey={3.1}>
                <Link className="menuicon" to="" id="name" >{this.props.user && this.props.user.name}</Link>
                </NavItem>
                <NavItem eventKey={3.1}>
                <Link className="menuicon" type="button" id="logbtn" onClick={() => this.clickHandlerLogout()}>Logout</Link>
                </NavItem>
                </Nav>

              :
              <Nav pullRight className="right">
                <NavItem eventKey={2} href="#">

                  <Link className="menuicon" href="#" onClick={() => store.dispatch(this.props.modalShow())}> Login / Sign Up </Link>
                </NavItem>
              </Nav>}
          </Nav>
            {this.props.modal.showModal ? <Modal /> : null}
    </Navbar.Collapse>
  </Navbar>
        )
  }
}



export default connect(
  ({modal, auth, menu, browser }) => ({modal: modal, user: auth, menu: menu, browser: browser }),
  {modalShow, logout, connectPlaid, menuShow, setMenuToTrue },
)(Navigation)

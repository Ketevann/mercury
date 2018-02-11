import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { resetPassword } from '../reducers/forgot'

class ResetPassword extends React.Component {
  constructor() {
    super()
    this.state = { error: null }
  }

  render() {
    const { forgot } = this.props
    return (
      <div id="forgot-password-wrapper">
        {
          forgot.reset && forgot.reset.changed ?
            <div id="resetmsg">Password has been reset ! Plase login with you new password by clicking
          <Link to="/login"> here</Link></div>
            :
            <form action method="post" name="Login_Form" className="form-signin" onSubmit={(evt) => {
              evt.preventDefault()
              if (evt.target.password.value.length < 6) {
                this.setState({ error: 'The password needs to be at least 6 characters' })
              }
              else {

                this.setState({ error: null })
                this.props.resetPassword({ password: evt.target.password.value, token: this.props.token })
                evt.target.password.value = ''
              }
            }}>

              <h3 className="form-signin-heading">Please Enter Your  New Password</h3>
              <hr className="colorgraph" /> <br />
              <input onChange={ () => this.setState({ error: null })} type="password" className="form-control" name="password" placeholder="Password" required />
              {this.state.error ?
                <div
                  className="password-error"
                >{this.state.error}</div>
                :
                null}
              <input style={{ 'background-color': '#53ecd0' }} className="btn forgot-btn" type="submit" value="Submit" />
            </form>
        }
      </div>



    )
  }
}


const mapStatetoProps = (state, ownProps) => {
  return {
    token: ownProps.routeParams.token,
    forgot: state.forgot
  }
}
export default connect(
  mapStatetoProps,
  { resetPassword },
)(ResetPassword)

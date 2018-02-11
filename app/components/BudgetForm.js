import React from 'react'
import { budgetCreate } from '../reducers/budget'
import { connect } from 'react-redux'
import { FormGroup, FormControl, Button } from 'react-bootstrap'


class BudgetForm extends React.Component {
  constructor() {
    super()
    this.state = {error: null}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange= this.handleChange.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const newBudget = {
      food: evt.target.food.value,
      bills: evt.target.bills.value,
      healthcare: evt.target.healthcare.value,
      emergencies: evt.target.emergency.value,
      transportation: evt.target.transporation.value,
      education: evt.target.education.value,
      entertainment: evt.target.ent.value,
      other: evt.target.other.value
    }
    let notaNumber = false;
    for (var key in newBudget) {
      if (isNaN(key)) {
        notaNumber = true
        break
      }
    }
   // if (!notaNumber)
    this.props.budgetCreate(newBudget)
   // else this.setState({error: 'Please enter valid values' })
    evt.target.food.value = ""
    evt.target.bills.value = ""
    evt.target.healthcare.value = ""
    evt.target.emergency.value = ""
    evt.target.transporation.value = ""
    evt.target.education.value = ""
    evt.target.ent.value = ""
    evt.target.other.value = ""
  }

handleChange(evt) {
  console.log(evt.target.value, ' in hanle change', typeof evt.target.value, isNaN(evt.target.value))
  if(isNaN(evt.target.value)){
    this.setState({error: 'Please enter a number'})
  }
  else {
    console.log(evt.target.value)
     this.setState({error: null})
  }
}
  render() {
    return (<div className="budgetflex">
      <div className="budgetimage">
        <img id="budgetformpic" src={require("../../public/budget.jpeg")} alt="" />
      </div>
      <div className="budgetform">
        <h3 id="budgetheader">Enter your budget</h3>
        {this.state.error ?
          this.state.error : null
      }
        <form onSubmit={(evt) => this.handleSubmit(evt)}>

          <FormGroup bsSize="large">
            <FormControl placeholder="Bills" className="budgetinput" required name="bills" step="0.01" id="example-text-input"
            onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup>
            <FormControl placeholder="Education" className="budgetinput" required name="education" step="0.01" id="example-search-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup bsSize="small">
            <FormControl placeholder="Emergency" className="budgetinput" required name="emergency" step="0.01" id="example-email-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup bsSize="small">
            <FormControl placeholder="Food" className="budgetinput" required name="food" step="0.01" id="example-tel-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup bsSize="small">
            <FormControl placeholder="Healthcare" className="budgetinput" required name="healthcare" step="0.01" id="example-tel-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup bsSize="small">
            <FormControl placeholder="Entertanment" className="budgetinput" required name="ent" step="0.01" id="example-tel-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup bsSize="small">
            <FormControl placeholder="Transportation" className="budgetinput" required name="transporation" step="0.01" id="example-month-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <FormGroup bsSize="small">
            <FormControl placeholder="Other" className="budgetinput" required name="other" step="0.01" id="example-week-input"
             onChange={(evt) => this.handleChange(evt) }
             />
          </FormGroup>

          <Button id="budgetsubmit" type="submit">Submit</Button>
        </form>
        </div>
      </div>
    )
  }
}


export default connect(
  null,
  { budgetCreate },
)(BudgetForm)

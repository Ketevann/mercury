'use strict'
const db = require('APP/db')
const Expenses = db.model('expense')
const User = db.model('users')


// need to add FindUser in case user exists
module.exports = require('express').Router()
.post('/', (req, res, next) => {
  Expenses.create(req.body)
  .then(expenses => {
    req.user.setExpense(expenses.id)
      .then(() => {
        res.send(expenses)
      })
  })
     .catch(next)
})
.get('/', (req, res, next) => {
  if (req.user) {
    return User.findOne({
      where: { id: req.user.id },
      include: [Expenses]
    })
  .then(budget => {
    if (budget === null) res.end()
    else {
      res.status(200).json(budget.expense)
    }
  })
  .catch(next)
  } else {
    res.status(404).end()
  }
})

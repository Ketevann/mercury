// const request = require('supertest')
// const { expect } = require('chai')
// const db = require('APP/db')
// const app = require('./start')
// const User = db.model('users')
// const Expense = db.model('expense')
// var agent = request.agent(app);

// const alice = {
//   email: 'alice@secrets.org',
//   password: '12345',
// }
// const budget = {
//   id: 99,
//   food: 440,
//   bills: 100
// }
// var email = ""
// describe('GET /api/budget', function () {

//   before('Await database sync', () => db.didSync)
//   afterEach('Clear the tables', () => db.truncate({ cascade: true }))



//   beforeEach('create a budget', () =>
//     Expense.create({
//       id: budget.id,
//       food: budget.food,
//       bills: budget.bills
//     })
//       .then(expense => {
//         return User.create({
//           email: alice.email,
//           password: alice.password,

//         })
//           .then(user => {
//             user.setExpense(expense.id)
//           })
//       })
//   )

//   it('responds with a 404 a user is not logged in', function () {
//     return agent
//       .get('/api/budget')
//       .expect(404)
//   })
//   it('returns a budget array when a user is logged in', () =>
//     agent
//       .post('/api/auth/login/local')
//       .send(alice)
//       .then(() => {
//         return agent
//           .get('/api/budget')
//           .expect(200)
//           .then(res => expect(res.body).to.contain({
//             food: "440.00",
//             bills: "100.00",
//             id: budget.id
//           }))
//       })
//   )
// })


// describe('POST /api/budget', function () {
//   beforeEach('create a user', () =>
//     User.create({
//       email: alice.email,
//       password: alice.password
//     })
//   )
//   it('creates a budget model', function () {
//     agent
//       .post('/api/auth/login/local')
//       .send(alice)
//       .then(() => {
//         return agent
//           .post('/api/budget')
//           .send(budget)
//           .expect(200)
//           .then(res => expect(res.body).to.contain({
//             food: "440.00",
//             bills: "100.00",
//             id: budget.id
//           }))
//           .catch(console.error())
//       })
//   })
// })

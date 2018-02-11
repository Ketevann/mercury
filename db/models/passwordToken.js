'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')
const { STRING, DATE } = require('sequelize')


module.exports = (db) => db.define('passwordtoken', {
  token: {
    type: STRING
  },
  expiration: {
    type: DATE
  }
})


module.exports.associations = (Token, {User}) => {
  Token.belongsTo(User)
}


'use strict'
const app = require('APP'), { env } = app

const api = module.exports = require('express').Router()
const plaid = require('plaid')
const envvar = require('envvar')
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_PUBLIC_KEY =process.env.PLAID_PUBLIC_KEY
const PLAID_ENV = envvar.string('PLAID_ENV', 'development')
const db = require('../db')
const AccessToken = db.model('accessToken');

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
)



// api.get('/timer', function(req, res, next) {
//   console.log('timer!!!')
//   res.send('In the timer route!!')
// })

module.exports = require('express').Router()

  .get('/token', (req, res) =>{
    res.send({ PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
      PLAID_ENV: PLAID_ENV})
  })
  .get('/', function (request, response, next) {
    response.render('index.ejs', {
      PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
      PLAID_ENV: PLAID_ENV,
    })
  })

  .post('/get_access_token', function (request, response, next) {
    const PUBLIC_TOKEN = request.body.public_token
    console.log('PUBLIC', PUBLIC_TOKEN)
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
      console.log('TOKENRESPONSE', tokenResponse)
      if (error != null) {
        console.log('ERROR', error)
        let msg = 'Could not exchange public_token!'
        console.log(msg + '\n' + error)
        return response.json({
          error: msg
        })
      }
      const ACCESS_TOKEN = tokenResponse.access_token
      const ITEM_ID = tokenResponse.item_id
      console.log('Access Token: ' + ACCESS_TOKEN)
      console.log('Item ID: ' + ITEM_ID)
      response.send(ACCESS_TOKEN)
    })
  })

  .get('/accounts', function (request, response, next) {
    // Retrieve high-level account information and account and routing numbers
    // for each account associated with the Item

    AccessToken.find({
      where: {
        user_id: request.user.dataValues.id
      }
    })
      .then(foundUser => {
        client.getAuth(foundUser.dataValues.accessToken, function (error, authResponse) {
          if (error != null) {
            let msg = 'Unable to pull accounts from the Plaid API.'
            // console.log("authResponse", authResponse)
            console.log(msg + '\n' + error)
            return response.json({
              error: msg
            })
          }

          console.log(authResponse.accounts)
          response.json({
            error: false,
            accounts: authResponse.accounts,
            numbers: authResponse.numbers,
          })
        })
      })
  })

  .post('/item', function (request, response, next) {
    // Pull the Item - this includes information about available products,
    // billed products, webhook information, and more.
    AccessToken.find({
      where: {
        user_id: request.user.dataValues.id
      }
    })
      .then(foundUser => {
        client.getItem(foundUser.dataValues.accessToken, function (error, itemResponse) {
          if (error != null) {
            console.log(JSON.stringify(error))
            return response.json({
              error: error
            })
          }

          // Also pull information about the institution
          client.getInstitutionById(itemResponse.item.institution_id, function (err, instRes) {
            if (err != null) {
              let msg = 'Unable to pull institution information from the Plaid API.'
              console.log(msg + '\n' + error)
              return response.json({
                error: msg
              })
            } else {
              response.json({
                item: itemResponse.item,
                institution: instRes.institution,
              })
            }
          })
        })
      })
  })

  .post('/transactions', function (request, response, next) {
    console.log("in transactions!!!!!")
    let startDate = request.body.startDate
    let endDate = request.body.endDate

    AccessToken.find({
      where: {
        user_id: request.user.dataValues.id
      }
    })
      .then(foundUser => {
        client.getTransactions(foundUser.dataValues.accessToken, startDate, endDate, {
          count: 250,
          offset: 0,
        }, function (error, transactionsResponse) {
          if (error != null) {
            console.log(JSON.stringify(error))
            return response.json({
              error: error
            })
          }
          console.log('pulled ' + transactionsResponse.transactions.length + ' transactions')

          response.json(transactionsResponse)
        })
      })
  })

  .post('/putTokenInDB', (req, res, next) => {
    console.log('IN API')
    console.log('REQ BODY AT', typeof req.body.accessToken)
    var user = req.body.user;
    AccessToken.create(
      {
        accessToken: req.body.accessToken,
        user_id: user.id

      })
      .then((accessToken) => {
        res.send(accessToken);
      })
  })


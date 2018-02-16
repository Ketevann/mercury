var schedule = require('node-schedule');
const app = require('APP'), { env } = app

var asyncLoop = require('node-async-loop');
var axios = require('axios');
var nodemailer = require('nodemailer');
const db = require('../db')
const AccessToken = db.model('accessToken');
const User = db.model('users');
const Expenses = db.model('expense')
const plaid = require('plaid')
const envvar = require('envvar')
var giphy = require('giphy-api')();
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY
const PLAID_ENV = envvar.string('PLAID_ENV', 'development')
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
)

var sendOutNotification = () => {

  //find all accounts
  AccessToken.findAll({
    include: [
      {
        //include asscoiated users and their budget
        model: User, include: [
          { model: Expenses }
        ]
      }
    ]
  }

  ).then((tokens) => {
    asyncLoop(tokens, function (token, next) {
      var sringified = JSON.parse(JSON.stringify(token))
      var createdAt = sringified.user.expense.created_at
      console.log(createdAt, 'date');
      date = createdAt.slice(0, 10)
      //get the day of when the budget was set
      var day = date.slice(8, 10)
      //get current Date
      var currentDate = new Date();
      var PreviusMonth = new Date();
      //set the day to the same day when the budget was set
     currentDate.setDate(day)
      //get previous month
      PreviusMonth.setMonth(PreviusMonth.getMonth() - 1)
      //set the day to the same day when the budget was set
      PreviusMonth.setDate(day)    
      //convert dates to yyyy-dd-mm format
      currentDate2 = currentDate.toISOString().split('T')[0]
      PreviusMonth2 = PreviusMonth.toISOString().split('T')[0]
      var rule = {}



let updateDay = day
 if (day[0] === '0') updateDay = day[1];
 //user email
let email = token.user.email
rule.day = updateDay
//var myRule = {hour: 4, minute: 0, dayOfMonth: 6, month: 2};
rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
rule.dayOfMonth = updateDay
rule.hour = 16;
rule.minute = 25;
      

      if (Math.abs(currentDate - PreviusMonth ) < Math.abs(currentDate - new Date(createdAt) )) {
    // var scheduleDate = new Date(2018, 02, 10, 18, 56, 30);

      var j = schedule.scheduleJob(rule, function () {
      client.getTransactions(token.accessToken, PreviusMonth2, currentDate2, {
        count: 250,
        offset: 0,
      }, function (error, transactionsResponse) {
        if (error != null) {
          console.log(JSON.stringify(error))
          return 'error'
        }
        var keyword = '';
        if (token.user.budgetUpdates === 'ON') {
          var budget = (+token.user.expense.food) + (+token.user.expense.bills) + (+token.user.expense.healthcare) + (+token.user.expense.transportation) +
            (+token.user.expense.education) + (+token.user.expense.emergencies) + (+token.user.expense.entertainment) + (+token.user.expense.other);

          var totalSum = transactionsResponse.transactions.reduce((total, val) => {
            if (val.amount > 0)
              return total + val.amount;
            else return total
          }, 0)
          var budgetStr = (budget >= totalSum) ? `${token.user.name} was under budget!` : `${token.user.name} was over budget!`
        }
        else {
          var budgetStr = '';        }

       
        if (token.user.prodUpdates === 'ON' && token.user.thing !== null) {
          console.log('not null');
          var total = transactionsResponse.transactions.reduce((total, val) => {
            if (val.name === token.user.thing)
              return total + val.amount;
            else return total
          }, 0)
          var message = (total < token.user.amount) ? `${token.user.name} did not overspend on ${token.user.thing}!` : `${token.user.name} overspent on ${token.user.thing}!`
          keyword = token.user.thing;
        }
        else {
          var message = ''
        }
        if (keyword === '' && token.user.budgetUpdates === 'ON')
          keyword = (budget >= totalSum) ? 'success' : 'failure'   
        var totalMessage = budgetStr + ' ' + message
        if (totalMessage !== " ") {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
              user: 'mercurybudget@gmail.com',
              pass: 'isteamgoodwith'
            }
          })         
          giphy.search(keyword) // 'flamingo is a keyword to search for
            .then(function (data) {
              var length = data.data.length;
              var chosen = data.data[Math.floor(length * Math.random())]
              var mailOptions = {
                from: '"Mercury" <mercurybudget@gmail.com>', // sender address
                to: email, // list of receivers
                subject: totalMessage,
                text: '',
                html: '<img src="cid:lets"/>',
                attachments: [{
                  filename: 'image.gif',
                  path: chosen.images.downsized.url,
                  cid: 'lets' //same cid value as in the html img src
                }]
              }
              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }                console.log('Message %s sent: %s', info.messageId, info.response);
                
              }) //closes sendmail
            }).catch((error) => console.log(error)) //closes giphy
        }//closes if total message is not null
      })//closes transactions


    })//closes timer
      }
    next()
    }, function (err) {
        if (err) {
          console.error('Error: ' + err.message);
          return;
        }

        console.log('Finished!');
      })

})//closes token




}
//}
//sendOutNotification()

module.exports = sendOutNotification;

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

  console.log('This runs every 5 minutes');
  AccessToken.findAll({
    include: [
      {
        model: User, include: [
          { model: Expenses }
        ]
      }
    ]
  }

  ).then((tokens) => {
    asyncLoop(tokens, function (token, next) {
       console.log(JSON.parse(JSON.stringify(token)).user, 'TOKKEN')
      var sringified = JSON.parse(JSON.stringify(token))

      var createdAt = sringified.user.expense.created_at
      console.log(createdAt, 'date');
      date = createdAt.slice(0, 10)
      var day = date.slice(8, 10)

      var currentDate = new Date();
      var PreviusMonth = new Date();
            console.log(date, 'date', currentDate, PreviusMonth);


      currentDate.setDate(day)
      PreviusMonth.setMonth(PreviusMonth.getMonth() - 1)
      PreviusMonth.setDate(day)
      console.log(currentDate, PreviusMonth,  new Date(createdAt) )
       console.log(Math.abs(currentDate - PreviusMonth )< Math.abs(currentDate - new Date(createdAt) ), new Date(createdAt) )


      currentDate2 = currentDate.toISOString().split('T')[0]
      PreviusMonth2 = PreviusMonth.toISOString().split('T')[0]
var rule = {}

rule.month = 2;
rule.dayOfMonth = 10
rule.hour = 16;
rule.minute = 25;

let updateDay = day
 if (day[0] === '0') updateDay = day[1];
let email = token.user.email
rule.day = updateDay
console.log(updateDay, ' updateDAyy', email)
var myRule = {hour: 4, minute: 0, dayOfMonth: 6, month: 2};
//var job = schedule.scheduleJob({dayOfMonth: [1,2,3,4,5,6,7]}, function(){

      //  PreviusMonth.setDate(day)
      //  PreviusMonth.setMonth(d.getMonth() - 1)

      if (Math.abs(currentDate - PreviusMonth ) < Math.abs(currentDate - new Date(createdAt) )) {
        console.log('less !!!!!!!!----------------------------------->')
     var scheduleDate = new Date(2018, 02, 10, 18, 56, 30);

      var j = schedule.scheduleJob({hour: 16, minute: 54, dayOfMonth: updateDay}, function () {
       //var j = schedule.scheduleJob('37 19 10 2 *', function () {

      console.log('PreviusMonth', PreviusMonth, ' currentDate', currentDate)
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
          var budgetStr = '';
        }

        //console.log('Transactions:',transactionsResponse)
        //console.log('pulled ' + transactionsResponse.transactions.length + ' transactions')
        if (token.user.prodUpdates === 'ON' && token.user.thing !== null) {
          console.log('not null');
          var total = transactionsResponse.transactions.reduce((total, val) => {
            if (val.name === token.user.thing)
              return total + val.amount;
            else return total
          }, 0)
          console.log('total!', token.user.thing, total, token.user.amount)
          var message = (total < token.user.amount) ? `${token.user.name} did not overspend on ${token.user.thing}!` : `${token.user.name} overspent on ${token.user.thing}!`
          keyword = token.user.thing;
          console.log('KEYYY', keyword)
        }
        else {
          var message = ''
        }
        if (keyword === '' && token.user.budgetUpdates === 'ON')
          keyword = (budget >= totalSum) ? 'success' : 'failure'
        //console.log(total,typeof total);
        //console.log(total, token[0].user.thing )
        //var message = (total<token[0].user.amount) ? `${token[0].user.name} was successful!` : `${token[0].user.name} was unsuccessful!`
        //var second = `${token[0].user.name} spent ${total} on ${token[0].user.thing} - goal was ${token[0].user.amount}`
        //var fin = message + " "+second;
        console.log("meessage:", message, "keyword", keyword, '************', email)
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

          // setup email data with unicode symbols
          // let mailOptions = {
          //   from: '"Fred Foo bread junior 👻" <*****@gmail.com>', // sender address
          //   to: 'ninbaratwli@gmail.com', // list of receivers
          //   subject: 'Hello ✔', // Subject line
          //   text: 'got bread ?', // plain text body
          //   html: '<b>got bread  ?</b>' // html body
          // }
          //console.log('to pass:',token[0].user.thing )
          giphy.search(keyword) // 'flamingo is a keyword to search for
            .then(function (data) {
              // Res contains gif data!
              //console.log('found a gif!!!')
              //console.log('HAS A THING??',data.data[0])
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
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                /*req.end()
                transporter.close()
                res.send('WHYYYYYY')*/
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

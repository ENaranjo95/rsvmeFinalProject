const MessagingResponse = require('twilio').twiml.MessagingResponse;
const smsClient = require('../services/twilio')
const moment = require('moment')

sendText = (req, res) => {
  // Twilio Response messages
  smsClient.messages.create({
       body: `Your table ${req.body.table} is reserved for this time ${req.body.time}!`,
       from: '+16179103731',
       to: `+1${req.body.phone}`
     })
    .then(message => console.log(message.sid))
    .done();
}

// API consumption for React

module.exports = function(app, db) {

  app.get('/api/reserved', function(req, res){
    db.collection('reserve').find().toArray((err, results) => {
      if (err){
        console.log(err)
        throw new Error('Connection to Database failed')
      }
      let rsvp = results.filter( item => item.checkIn === false )
      return res.json(rsvp)
    })
  });

  // This is the collection for customer orders
  app.post('/api/reserve', (req, res) => {
    db.collection('reserve').save({first: req.body.first, last: req.body.last, email: req.body.email, number: req.body.phone, guests: req.body.guests, time: req.body.time, table: req.body.table, special: req.body.special, checkIn: false}, (err, result) => {
      if (err){
        console.log(err)
        throw new Error('Saving to Database failed')
      }
      console.log('saved to database')
      sendText(req, res)
      return res.sendStatus(200)
    })
  });
};

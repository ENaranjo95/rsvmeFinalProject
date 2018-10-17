const text          = require('../services/sendText')
let router          = require('express').Router()

// API consumption for React
module.exports = (app, db) => {

  app.get('/api/reserved', (req, res) => {
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
    db
      .collection('reserve')
      .save(
        {
          first: req.body.first,
          last: req.body.last,
          email: req.body.email,
          number: req.body.phone,
          guests: req.body.guests,
          time: req.body.time,
          table: req.body.table,
          special: req.body.special,
          checkIn: false
        },
        (err, result) => {
          if (err){
            console.log(err)
            throw new Error('Saving to Database failed')
          }
          console.log('saved to database')
          text(req, res)
          return res.sendStatus(200)
        }
      );
  });
};

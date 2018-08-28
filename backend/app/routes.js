const MessagingResponse = require('twilio').twiml.MessagingResponse;
const smsClient = require('./services')
const moment = require('moment')

function sendText(req, res){
  // Twilio Response messages
  smsClient.messages.create({
       body: `Your table ${req.body.table} is reserved for this time ${req.body.time}!`,
       from: '+16179103731',
       to: `+1${req.body.phone}`
     })
    .then(message => console.log(message.sid))
    .done();
}

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });



    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('reserve').find().toArray((err, result) => {
          if (err) return console.log(err)
          console.log(result)
          res.render('profile.ejs', {
            user : req.user,
            customers: result
          })
        })
    });

    app.get('/api/reserved', function(req, res){
      db.collection('reserve').find().toArray((err, results) => {
        if (err) return console.log(err)
        let rsvp = results.filter( item => item.checkIn === false )
        return res.json(rsvp)
      })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    // This is the collection for customer orders
    app.post('/api/reserve', (req, res) => {
      db.collection('reserve').save({first: req.body.first, last: req.body.last, email: req.body.email, number: req.body.phone, guests: req.body.guests, time: req.body.time, table: req.body.table, checkIn: false}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        sendText(req, res)
        return res.sendStatus(200)
      })
    })

    // For barista to check order complete
    app.put('/checkIn', (req, res) => {
      db.collection('reserve')
      .findOneAndUpdate({first: req.body.first, last: req.body.last, email: req.body.email}, {
        $set: {
          checkIn: true
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    // Will delete from customerOrder collections
    app.delete('/remove', (req, res) => {
      db.collection('messages').findOneAndDelete({email: req.body.email}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form for restaurant
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process login form for customer
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================

        // show the signup form for customer
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form for customer
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));



// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

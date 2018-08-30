const express 			= require('express')
const bodyParser 		= require('body-parser')
const morgan 				= require('morgan')
const session 			= require('express-session')
const dbConnection 	= require('./database')
const MongoStore 		= require('connect-mongo')(session)
const passport 			= require('./passport');
const app 					= express()
const port 					= process.env.PORT || 7000
// Route requires
const user = require('./routes/user')

// MIDDLEWARE
app.use(morgan('dev'))
app.use( bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: true, //required
		saveUninitialized: true //required
	})
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use('/user', user)

// Starting Server
app.listen(port, () => {
	console.log(`App listening on PORT: ${port}`)
})

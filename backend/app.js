var express = require('express');
var path = require('path');
// const fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
var cors = require('cors')

const utilities = require('./middlewares/utilities');
//Express-DB session mngmt with prisma
const { PrismaClient } = require('@prisma/client');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');

//ROUTER IMPORTS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authRoute');


var app = express();

// CORS SETUP
app.use(cors({
  origin: ["http://localhost:3000"]
}))

// PRISMA/EXPRESS SESSION 
const store = new PrismaSessionStore(
  new PrismaClient(), // Initialize Prisma client for session storage
  {
    checkPeriod: 2 * 60 * 1000, // 2 minutes in milliseconds
    dbRecordIdIsSessionId: true, // Use session ID as the primary key in the database
    dbRecordIdFunction: utilities.generateRandomKey(), // Optional function for generating custom session IDs
  }
);

const sessionOptions = {
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },
  secret: utilities.generateRandomKey(), // Secret used to sign the session ID cookie
  resave: true, // Resave the session data even if it wasn't modified
  saveUninitialized: true, // Save uninitialized sessions
  store: store
};



//MIDDLEWARE ***************************************
// app.use(fileUpload({
//   createParentPath: true,
//   debug: true
// }))
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionOptions))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));


// ROUTES *********************************************
app.use('/', indexRouter);
// app.use('/profile', usersRouter);
app.use('/signup', authenticationRouter)
app.use('/auth', authenticationRouter)


module.exports = app;

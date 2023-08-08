var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentication');


var app = express();

//MIDDLEWARE ***************************************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));

// ROUTES *********************************************
app.use('/', indexRouter);
app.use('/profile', usersRouter);
app.use('/signup', authenticationRouter)
app.use('/login', authenticationRouter)


module.exports = app;

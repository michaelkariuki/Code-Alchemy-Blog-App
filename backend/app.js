var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const utilities = require('./middlewares/utilities');
//Express-DB session mngmt with prisma
const {PrismaClient} = require("@prisma/client")
const prismaSessionStore = require("@quixo3/prisma-session-store")

//ROUTER IMPORTS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authRoute');


var app = express();

// PRISMA/EXPRESS SESSION 
const prisma = new PrismaClient();
const store = new prismaSessionStore({
    prisma: prisma,
    secret: utilities.generateRandomKey()
})

//MIDDLEWARE ***************************************
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({store: store}))
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

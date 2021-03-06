require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('ifNotCond', function(v1, v2, options) {
  if(v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('ifEmpty', function(v1, options) {
  if(v1.length == 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});


const mongoose = require("mongoose");

// We replace the Bd name by the name within the MONGODB_URI var that is in .env file
// this is to avoid showing the Db route. 
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var groupRouter = require('./routes/group');
var meetupRouter = require('./routes/meetup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', groupRouter);
app.use('/', meetupRouter);
//app.use('/', peopleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

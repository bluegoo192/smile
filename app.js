var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');  // =========
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./node_modules/db.js');  //db.js is the url of our database
var mongoose = require('mongoose'); //mongoose is for accessing the database
mongoose.connect(dbConfig.url);

var app = express();

var users = require('./routes/users'); //======

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//add app.use(favicon()); ?
// OR uncomment after placing your favicon in /public ?
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // ========
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport -- this block must appear before route configuration
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey', resave: 'true', saveUninitialized: 'false'})); // ==========
app.use(passport.initialize());
app.use(passport.session());


// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./node_modules/init_passport');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);
app.use('/users', users); // ======

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

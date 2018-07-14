var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var UserList = require('./routes/userlist');
var UserModel = require('./models/userModel');

var expressValidator = require('express-validator');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

let docDbClient = new DocumentDBClient(config.host, {
  masterKey: config.authKey
});
let userModel = new UserModel(docDbClient, config.databaseId, config.collectionId);
let userList = new UserList(userModel);
userModel.init();

app.get('/', function(req, res){
  res.render('index');
});
app.get('/signup', function(req, res){
  res.render('signup');
});
app.post('/login', userList.getUser.bind(userList));
app.post('/signupuser', userList.addUser.bind(userList));
app.set('view engine', 'jade');

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

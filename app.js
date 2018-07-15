const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('./config');
const UserList = require('./routes/userlist');
const UserModel = require('./models/userModel');
const expressValidator = require('express-validator');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


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
app.use(passport.initialize());
var FACEBOOK_APP_ID = '1930974893860618';
var FACEBOOK_APP_SECRET = '9f3eb61be9ca5ee7bbac9de603e784f1';

var fbOpts = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
};

var fbCallback = function(accessToken, refreshToken, profile, callback){
    //console.log(profile);
    callback(null, profile);
};
passport.use(new FacebookStrategy(fbOpts, fbCallback));

app.get('/facebook', passport.authenticate('facebook', {scope: "email"}));
app.get('/facebook/callback', passport.authenticate('facebook',
    { session: false }), function(req, res){
    userList.getFBUser(req, res);
});

app.post('/login', userList.getUser.bind(userList));
app.post('/signupuser', userList.addUser.bind(userList));


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
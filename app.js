const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('./config');
const UserList = require('./routes/userlist');



//Új2
const ModelList = require('./routes/modelList');
const Model_listList = require('./routes/model_listList');
//Új2 vége



const UserModel = require('./models/userModel');
const expressValidator = require('express-validator');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');



//Új
const GoogleStrategy = require('passport-google-oauth20');
const OfficeStrategy = require('passport-azure-ad').OIDCStrategy;

const session = require('express-session');
//Új vége



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



//Új
app.use(session({
  secret: 'w2jqqQAowL',
  name: 'session',
  resave: false,
  saveUninitialized: false
}))
//Új vége



let docDbClient = new DocumentDBClient(config.host, {
  masterKey: config.authKey
});
let userModel = new UserModel(docDbClient, config.databaseId, config.user_collectionId);
let userList = new UserList(userModel);
userModel.init();



//Új2
let modelModel = new UserModel(docDbClient, config.databaseId, config.model_collectionId);
let modelList = new ModelList(modelModel);
modelModel.init();

let model_listModel = new UserModel(docDbClient, config.databaseId, config.model_list_collectionId);
let modelListList = new Model_listList(model_listModel);
model_listModel.init();
//Új2 vége




app.get('/', function(req, res){
  res.render('index');
});
app.get('/signup', function(req, res){
  res.render('signup');
});
app.get('/platform', function (req, res) {
    res.render('platform_v2');
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



//Új
var GOOGLE_APP_ID = '644669255861-36hib7gserfhc6kst2r15kqg7aj9gjt9.apps.googleusercontent.com';
var GOOGLE_APP_SECRET = 'y3O117GP9GxWTiyvuRT0cDUL';

var glOpts = {
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: 'http://localhost:3000/google/callback'
};

var glCallback = function(accessToken, refreshToken, profile, callback){
  /* console.log('------------');
  console.log(profile._json);
  console.log('-----------'); */
  callback(null, profile);
}

passport.use(new GoogleStrategy(glOpts, glCallback));

var OFFICE_APP_ID = '4e9fce29-dc6a-474e-b35c-8ce1251e9353';
var OFFICE_APP_SECRET = 'vsnPXC4{psrtZTMJ9741-#(';

var ofOpts = {
  redirectUrl: 'http://localhost:3000/office/callback',
  clientID: OFFICE_APP_ID,
  clientSecret: OFFICE_APP_SECRET,
  identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
  allowHttpForRedirectUrl: true, // For development only
  responseType: 'code',
  validateIssuer: false, // For development only
  responseMode: 'query',
  scope: ['User.Read', 'profile', ]
};

var ofCallback = function(iss, sub, profile, accessToken, refreshToken, callback){
  /* console.log('--------');
  console.log(profile);
  console.log('---------'); */

  callback(null, profile);  
};

passport.use(new OfficeStrategy(ofOpts, ofCallback));

//Új vége



app.get('/facebook', passport.authenticate('facebook', {scope: "email"}));
app.get('/facebook/callback', passport.authenticate('facebook',
    { session: false }), function(req, res){
    userList.getFBUser(req, res);
});



//Új
app.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google',
  {session: false }), function(req, res) {
  //res.send(req.user._json);
  userList.getGlUser(req, res);
});

app.get('/office', passport.authenticate('azuread-openidconnect'));
app.get('/office/callback', passport.authenticate('azuread-openidconnect', {session:false}), function(req, res){
  userList.getOfUser(req, res);
});
//Új vége



//Új2
app.get('/addlist', function(req, res){
  modelList.getModels(req, res);
});
app.post('/addlist/done', function(req, res){
/*   console.log('-----------------');
  console.log('addlist/done');
  console.log(req.body);
  console.log('-----------------'); */
  modelListList.addModelList(req, res);
});

app.get('/editlist', function(req, res){
  modelListList.getModelList(req, res);
});
app.post('/editlist/done', function(req, res){
/*   console.log('-----------------');
  console.log('editlist/done');
  console.log(req.body);
  console.log('-----------------'); */
  modelListList.editModelList(req, res);
});

app.get('/profile', function(req, res){
  userList.getUserById(req, res);
});


app.get('/setSchool', function(req, res){
  res.send("Set school");
})
//Új2 vége



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
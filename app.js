const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('./config');
const ListsList = require('./routes/lists_list');
const ListsModel = require('./models/lists_model');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

let listsModel = new ListsModel(docDbClient, config.databaseId, config.lists_collectionId);
let listsList = new ListsList(listsModel);
listsModel.init();
app.post('/addListItem', listsList.addList.bind(listsList));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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

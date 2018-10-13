const dotenv = require('dotenv');
dotenv.config();
//TODO: install passport?
const createError = require('http-errors');
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const guidRouter = require('./routes/guid');
const randomNumberRouter = require('./routes/random-number');
const randomTextRouter = require('./routes/random-text');
const randomJsonRouter = require('./routes/random-json');
const jwtTestPageRouter = require('./routes/jwt-test');
const globalRouter = require('./routes/globals');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);  // use to set layout
app.set('layout', 'layout.ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guid', guidRouter);
app.use('/random-number', randomNumberRouter);
app.use('/random-text', randomTextRouter);
app.use('/random-json', randomJsonRouter);
app.use('/jwt-test', jwtTestPageRouter);
app.use('/globals', globalRouter);

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

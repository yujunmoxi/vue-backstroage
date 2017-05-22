var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')

var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var cate = require('./routes/cate');
var upload = require('./routes/upload');
var article = require('./routes/article');
var comment = require('./routes/comment');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user'); //连接地址

var db = mongoose.connection;

db.on('error', () => {
  throw new Error('connect fail')
}); //错误提示

console.log('connect success')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use('/', index);
app.use('/users', users);
app.use('/cate', cate);
app.use('/upload', upload);
app.use('/article', article);
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
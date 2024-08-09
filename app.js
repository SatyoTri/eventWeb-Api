const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//router
const categoriesROuter = require('./app/api/v1/categories/router');
const imagesROuter = require('./app/api/v1/images/router');
const v1 = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handle-error');

app.get('/',(req,res) =>{
  res.status(200).json({
    message: 'Welvome event'
  });
})

app.use(v1, categoriesROuter);
app.use(v1, imagesROuter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);


module.exports = app;

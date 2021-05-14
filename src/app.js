require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const reviewsRouter = require('./reviews/reviews-router');
const servicesRouter = require('./services/services-router');

const app = express();

  app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  }));

  app.use(helmet());
  app.use(cors()); 
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
  app.use('/reviews', reviewsRouter)
  app.use('/services', servicesRouter)

  app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } };
    } else {
      console.log(error);
      response = { message: error.message, error }; 
    }
    res.status(500).json(response);
  })

  module.exports = app;
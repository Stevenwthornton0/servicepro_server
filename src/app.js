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
  app.options('*', cors()); 

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
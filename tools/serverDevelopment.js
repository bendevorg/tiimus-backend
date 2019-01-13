'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const morgan = require('morgan');
const logger = require('./logger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const constants = require('../server/utils/constants');

app.use(
  cors({
    origin: ['http://localhost:3341'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use(cookieParser());
app.use('/static', express.static(constants.values.STATIC_PATH));
app.use('/', router);
app.use(logger.errorHandler());
app.use(morgan('tiny'));

module.exports = app;

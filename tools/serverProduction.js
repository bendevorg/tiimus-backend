'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const constants = require('../server/utils/constants');

const app = express();

app.use(
  cors({
    origin: ['http://tiimus.com', 'https://tiimus.com'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use(cookieParser());
app.use('/static', express.static(constants.values.STATIC_PATH));
app.use('/', router);
app.use(logger.errorHandler());

module.exports = app;

'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./logger');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use('/', router);
app.use(logger.errorHandler());

module.exports = app;

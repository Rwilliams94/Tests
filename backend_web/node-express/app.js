const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const companies = require('./API/companies')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/companies', companies)

module.exports = app;

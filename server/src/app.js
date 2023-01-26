const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const { errorHandler, NotFoundError } = require('@zbtickets/common');

const app = express();
app.set('trust proxy', true); // it will accept every kind of traffic, believing it is coming from nginx

require('./startup/database-connection')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/production')(app);
require('dotenv').config(); //? to use dotenv file

const startupDebugger = require('debug')('app:startup');
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled');
}

app.get('/api/1', (req, res) => {
    res.send('helo');
});

app.all('*', async (req, res) => {
    // if route is not recognized, we will just throw a not found error
    throw new NotFoundError();
});

app.use(errorHandler); // it is just a reference of error middleware for error handling
//! must be used on the last

module.exports.app = app;

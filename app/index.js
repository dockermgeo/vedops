"use strict";
/* VARIABLES, MODULES */
const config = require(__dirname+'/lib/ConfigHandler');
const logger = config.getLogger('INDEX');
//
const dbi = require(__dirname+'/lib/MongoConnector');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path');
var app = express();
/* SETTINGS */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use([ '/', '/home'], require(__dirname+'/routes/home.js'));
app.use([ '/api', '/rest'], require(__dirname+'/routes/api'));

app.listen(config.getPort())
logger.info(config.getAppname() + ' started on port ' + config.getPort())

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  logger.error(err.status, err.message)
})

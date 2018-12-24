"use strict";
/* VARIABLES, MODULES */
const config = require(__dirname+'/../lib/ConfigHandler');
const logger = config.getLogger('API');
var express = require('express');
var router = express.Router();
const mongo = require(__dirname+'/../lib/MongoConnector');
//

router.get('/', function(req, res, next) {
  mongo.getList(res);
});
router.get('/help', function(req, res, next) {
  res.send('Usage: "/add/:namespace/:appname/:stage/:version"')
});
router.get('/add', function(req, res, next) {
  logger.debug("Wrong Route: Missing /namespace/appname/stage/version", '/add/:namespace/:appname/:stage/:version')
  res.sendStatus(400);
});
router.get('/add/:namespace', function(req, res, next) {
  logger.debug("Wrong Route: Missing /appname/stage/version", '/add/:namespace/:appname/:stage/:version')
  res.sendStatus(400);
});
router.get('/add/:namespace/:appname', function(req, res, next) {
  logger.debug("Wrong Route: Missing /stage/version", '/add/:namespace/:appname/:stage/:version')
  res.sendStatus(400);
});
router.get('/add/:namespace/:appname/:stage', function(req, res, next) {
  logger.debug("Wrong Route: Missing /version", '/add/:namespace/:appname/:stage/:version')
  res.sendStatus(400);
});
router.get('/add/:namespace/:appname/:stage/:version', function(req, res, next) {
  const newobj = { namespace:req.params.namespace, stage:req.params.stage, name:req.params.appname, version:req.params.version};
  mongo.upsert(newobj);
  res.sendStatus(200);
});

module.exports = router;

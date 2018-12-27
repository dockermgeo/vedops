"use strict";
/* VARIABLES, MODULES */
const config = require(__dirname+'/../lib/ConfigHandler');
const logger = config.getLogger('API');
const express = require('express');
const router = express.Router();
const mongo = require(__dirname+'/../lib/MongoConnector');

/* GET */
router.get('/', function(req, res, next) {
  mongo.getList(res);
});
/* SET */
router.get('/set/refresh/:seconds', function(req, res, next) {
  process.env.REFRESH_TIME = req.params.seconds;
  res.sendStatus(200);
});
/* ADD */
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
  logger.debug("SYNTAX OK - using POST now: ", '/add/:namespace/:appname/:stage/:version')
  res.sendStatus(400);
});
// --> REAL INSERT
router.post('/add/:namespace/:appname/:stage/:version', function(req, res, next) {
  logger.debug("ADDING --> ",req.params.namespace, req.params.stage, req.params.appname, req.params.version);
  const newobj = { namespace:req.params.namespace, stage:req.params.stage, name:req.params.appname, version:req.params.version};
  mongo.upsert(newobj,res);
});
/* DELETE */
router.post('/delete/id/:id', function(req, res, next) {
  var deleteObject = { '_id': req.params.id };
  logger.debug("TRY DELETE", deleteObject);
  mongo.deleteDocumentByObject(deleteObject, res);
});
router.post('/delete/app/:appname', function(req, res, next) {
  var deleteObject = {'name': req.params.appname};
  logger.debug("TRY DELETE", deleteObject);
  mongo.deleteDocumentByObject(deleteObject, res);
});
router.post('/delete/version/:appname/:stage', function(req, res, next) {
  const deleteObject = { namespace:req.params.namespace, stage:req.params.stage, name:req.params.appname, version:null};
  logger.debug("TRY DELETE", deleteObject);
  mongo.upsert(deleteObject,res);
});

//
module.exports = router;

"use strict";
/* VARIABLES, MODULES */
const config = require(__dirname+'/../lib/ConfigHandler');
const logger = config.getLogger('HOME');
const mongo = require(__dirname+'/../lib/MongoConnector');
var express = require('express');
var router = express.Router();
//

router.get('/', function(req, res, next) {
  var htmlobject = {
      "HTML_TITLE": config.getAppname(),
      "HTML_STAGES": config.getStageNames(),
      "HTML_TABLE_COLSPAN": config.getStageNames().length + 1,
      "HTML_TABLE_CONTENT": null
  }
  mongo.getHome(res,htmlobject);
});

module.exports = router;

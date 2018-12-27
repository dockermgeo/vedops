"use strict";
/* VARIABLES, MODULES */
const config = require(__dirname+'/../lib/ConfigHandler');
const logger = config.getLogger('HOME');
const mongo = require(__dirname+'/../lib/MongoConnector');
var express = require('express');
var router = express.Router();
var session = require('express-session');



router.get('/', function(req, res, next) {
  var switchstate = "unchecked";
  var refreshtime=0;
  if (req.session.refresher != undefined) {
    if (req.session.refresher === 'enabled') {
      refreshtime = config.getRefreshTime();
      switchstate = "checked";
    }
  }

  logger.trace("HOME-CHECK",refreshtime, switchstate)

  var htmlobject = {
      "HTML_TITLE": config.getAppname(),
      "HTML_REFRESH_TIME": refreshtime,
      "HTML_CSSTHEME": config.getStyleName(),
      "HTML_STAGES": config.getStageNames(),
      "HTML_TABLE_COLSPAN": config.getStageNames().length + 1,
      "HTML_TABLE_CONTENT": null,
      "HTML_VERSION": config.getVersion(),
      "HTML_BUILDDATE": config.getBuildDate(),
      "HTML_SWITCHSTATE": switchstate
  }
  mongo.getHome(res,htmlobject);
});

module.exports = router;

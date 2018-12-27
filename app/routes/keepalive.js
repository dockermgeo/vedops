"use strict";
/* VARIABLES, MODULES */
const config = require(__dirname+'/../lib/ConfigHandler');
const logger = config.getLogger('KEEPALIVE');
const express = require('express');
const router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});
router.get('/json', function(req, res, next) {
  res.json( {"status":200} );
});

/* POST */
router.post('/', function(req, res, next) {
  res.sendStatus(200);
});
router.post('/json', function(req, res, next) {
  res.json( {"status":200} );
});
//

module.exports = router;

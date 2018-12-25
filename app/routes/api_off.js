"use strict";
/* VARIABLES, MODULES */
const express = require('express');
const router = express.Router();
/* GET */
router.get('/', function(req, res, next) {
  res.send('API is disabled!')
});
//
module.exports = router;

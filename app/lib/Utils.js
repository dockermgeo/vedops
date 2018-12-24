'use strict'
var dateFormat = require('dateformat');

class Utils {
  Utils() {}

  getDate() {
    return new Date();

  }
  getDateFormated() {
    var now = new Date();
    return dateFormat(now, "yyyy-mm-dd HH:MM:ss")
  }
}

module.exports = new Utils();

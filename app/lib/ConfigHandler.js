'use strict';

var CFG = require(__dirname + "/../config.json");


class ConfigHandler {
	ConfigHandler() {}

  getLogLevel() {
    return process.env.LOGLEVEL||CFG.loglevel;
  }
  getPort() {
    return process.env.RUN_PORT||CFG.port;
  }
  getMongoDbHost() {
    return process.env.MONGODB_HOST||CFG.mongodb_host;
  }
  getMongoDbPort() {
    return process.env.MONGODB_PORT||CFG.mongodb_port;
  }
	getAppname() {
		return CFG.appname;
	}
	getLogger(loggername) {
		var logger = require('log4js').getLogger(loggername);
		logger.setLevel(process.env.LOGLEVEL || CFG.loglevel);
		return logger;
	}
	getStyleName() {
		return process.env.CSS_THEME || 'black';
	}
	getStageNames() {
		if (process.env.LIST_STAGES != null) {
			const LIST_STAGES=process.env.LIST_STAGES.split(" ");
			var RC_STAGES=[];
			for (var si in LIST_STAGES) {
				var stage=LIST_STAGES[si].replace("\"","");
				RC_STAGES.push(stage);
			}
			return RC_STAGES;
		}

		return CFG.stages;
	}

}
module.exports = new ConfigHandler();



var dbi = require(__dirname+'/lib/MongoConnector');
var config = require(__dirname+'/lib/ConfigHandler');
var logger = config.getLogger();

logger.info("Inserting TEST-Data")
//"http://localhost:"+config.getPort()+"/api/add/namespace/HelloWorld-UI/etu/37"

addEntry('HelloWorld-UI/etu/137');
addEntry('HelloWorld-UI/itu/111');
addEntry('HelloWorld-UI/satu/98');
addEntry('HelloWorld-UI/prod/2');
//
addEntry('HelloWorld-DB/etu/1932');
addEntry('HelloWorld-DB/itu/1132');
addEntry('HelloWorld-DB/satu/1002');
addEntry('HelloWorld-DB/prod/982');
//
addEntry('HelloWorld-API/etu/83');
addEntry('HelloWorld-API/itu/73');
addEntry('HelloWorld-API/satu/66');
addEntry('HelloWorld-API/prod/4');


function addEntry(entry) {
  const axios = require('axios');
  const addurl = "http://localhost:"+config.getPort()+"/api/add/namespace/"+entry;
  logger.info("ADDING", addurl);

  axios.get(addurl)
    .then(response => {
      logger.info(response.status);
    })
    .catch(error => {
      logger.error(error);
    });
}

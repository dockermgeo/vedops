var MongoClient = require('mongodb').MongoClient;

var utils = require(__dirname+'/Utils.js');
var config = require(__dirname+'/ConfigHandler');
const logger = config.getLogger('CONNECTOR');
const dbcollection = "buildsystem";

var url = "mongodb://"+config.getMongoDbHost()+":"+config.getMongoDbPort()+"/";
if (process.env.MONGO_USER != undefined) {
	var mongo_user = process.env.MONGODB_USER;
	var mongo_pw = process.env.MONGODB_PASSWORD;
	url = "mongodb://"+mongo_user+":"+mongo_pw+"@"+config.getMongoDbHost()+":"+config.getMongoDbPort()+"/";
}

class MongoConnector {
	getList(res) {
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db(dbcollection);
		  dbo.collection("builds").find({}, { projection: { _id:1, name: 1, mdate: 1, versions: 1 } }).toArray(function(err, result) {
		    if (err) throw err;

				res.json(result)
	    	db.close();
	  	});
		});
	}

	getHome(res, htmlobject) {
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db(dbcollection);
		  dbo.collection("builds").find({}, { projection: { _id:1, name: 1, mdate: 1, versions: 1 } }).toArray(function(err, result) {
		    if (err) throw err;
				htmlobject.HTML_TABLE_CONTENT=result,
				res.render("home.pug", htmlobject);
	    	db.close();
	  	});
		});
	}

	upsert(newobj) {
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		  if (err) throw err;

		  var dbo = db.db(dbcollection);
		  dbo.collection("builds").find({}, { projection: { _id:0, name: 1, mdate: 1, versions: 1 } }).toArray(function(err, result) {
		    if (err) {
					logger.error(err)
					return
				}

				let is_new=true;
		    for (var i in result) {
		      var oi = result[i];
		      if (newobj.name === oi.name) {
						is_new=false;
						var list_version=oi.versions;
						var list_rc=[];
						for (var vi in list_version) {
							var obj = list_version[vi];
							if (newobj.stage === obj.name) {
								obj={"name":newobj.stage, "version":newobj.version, "mdate": utils.getDateFormated()}
							}
							list_rc.push(obj);
						}

						var newdocument = {name: newobj.name, mdate:utils.getDateFormated(), versions:list_rc}
						dbo.collection('builds').update({name:newobj.name},newdocument, {upsert:true}, function(err, result) {
								if (err)
									logger.error(err);

								db.close();
						});
					}
		    }

				if (is_new){
						// var list_rc = [ { name: "etu", version: newobj.version, mdate:utils.getDateFormated()}, {name:"itu",version:null,mdate:null}, {name:"satu",version:null,mdate:null}]
						const STAGES = config.getStageNames();
						var sicount = 0;
						var list_rc = [];
						for (var si in STAGES) {
							var sname = STAGES[si].toLowerCase();
							var version = null;
							var mdate = null;
							if (sicount < 1) {
								version = newobj.version;
								mdate = utils.getDateFormated();
							}
							list_rc.push({ name: sname, version: version, mdate:mdate })
							sicount++;
						}
						var newdocument = {name: newobj.name, mdate:utils.getDateFormated(), versions:list_rc}
						logger.info("ADD NEW", newdocument)
						dbo.collection('builds').update({name:newobj.name},newdocument, {upsert:true}, function(err, result) {
								if (err)
									logger.error(err)

								db.close();
						});
				}

		    db.close();
				return;
	  });
		});
	}




}
module.exports = new MongoConnector();

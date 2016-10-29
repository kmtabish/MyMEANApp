var db = require('../../config/db');
var dbs;
module.exports = {
  get:function(req, res){
	dbs = db.getDb();
		db.getDb().collection('test').find().toArray(function(err, data) {
	    console.log('Calling the test Collection');
			res.status(200).send(data);
		});
	}
}

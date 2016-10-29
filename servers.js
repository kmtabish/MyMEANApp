// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var async 				 = require("async");
// configuration ===========================================

// config files
var db = require('./config/db');
var port = process.env.PORT || 8082; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
var dbs;

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//ROUTES



// routes ==================================================
require('./app/routes')(app); // pass our application into our routes
// start app ===============================================
app.listen(port);
console.log('Running on port ' + port); 			// shoutout to the user
//exports = module.exports = app; 						// expose app







function callDB(callback){
	db.connectToServer( function( err ) {
		if(!err){
			callback();
			console.log('DB CONNECTED');
		}
	});
}


function getDBData(callback){
	dbs = db.getDb();
 dbs.collection('test').find().toArray(function(err, data) {
	 callback();
    console.log('DB CONNECTED',data);
	});
}
async.series([callDB, getDBData], function(){
    console.log("Executed all calls in series.");
})


function HelloWorldOne(callback){
    setTimeout(function(){
        console.log("HelloWorld - One");
        callback();
    }, Math.floor(Math.random() * 1000));
}

function HelloWorldTwo(callback){
    setTimeout(function(){
        console.log("HelloWorld - Two");
        callback();
    }, Math.floor(Math.random() * 1000));
}

function HelloWorldThree(callback) {
    setTimeout(function () {
        console.log("HelloWorld - Three");
        callback();
    }, Math.floor(Math.random() * 1000));

}

async.series([HelloWorldOne, HelloWorldTwo, HelloWorldThree], function(){
    console.log("Executed all calls in series.");
})

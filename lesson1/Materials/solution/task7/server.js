var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser')
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
	secret: 'angular_tutorial',
	resave: true,
    saveUninitialized: true,
}));

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('tutor', new Server("localhost", 27017, {safe: true}, {auto_reconnect: true}, {}));
db.open(function(){
		console.log("mongo db is opened!");
		
		db.collection('notes', function(error, notes) {
			db.notes = notes;
		});
});

app.get("/notes", function(req,res) {
	db.notes.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/notes", function(req,res) {
	db.notes.insert(req.body);
	console.log(req.body);
	res.end();
});

app.delete("/notes", function(req,res) {
	var id = new ObjectID(req.query.id);
	db.notes.remove({_id: id}, function(err){
		if (err) {
			console.log(err);
			res.send("Failed");
		} else {
			res.send("Success");
		}
	})
});

app.listen(3000);

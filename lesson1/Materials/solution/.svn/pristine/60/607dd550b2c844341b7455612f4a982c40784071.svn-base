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

		db.collection('sections', function(error, sections) {
			db.sections = sections;
		});
});

app.get("/notes", function(req,res) {
	db.notes.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.post("/notes", function(req,res) {
	db.notes.insert(req.body);
	res.end();
});

app.get("/sections", function(req,res) {
	db.sections.find(req.query).toArray(function(err, items) {
		res.send(items);
	});
});

app.get("/checkUser", function(req,res) {
	if (req.query.user.length>2) {
		res.send(true);
	} else {
		res.send(false);
	}
});

app.post("/sections/replace", function(req,resp) {
	// do not clear the list
	if (req.body.length==0) {
		resp.end();
	}
	// this should be used only for reordering
	db.sections.remove({}, function(err, res) {
		if (err) console.log(err); 
		db.sections.insert(req.body, function(err, res) {
			if (err) console.log("err after insert",err);
			resp.end();
		});
	});
});

app.listen(3000);

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

app.get("/notes", function(req,res) {
	fs.readFile("notes.json", function(err, result) {
		result = ""+result; // convert to String
		result = result.substring(0, result.length - 1); //remove last \n
		result = "["+result+"]";
		if (result) {
			result = result.split("\n").join(",");
			res.send(result);
		} else {
			res.end();
		}
	});
});

app.post("/notes", function(req, res) {
	var note = req.body;
	var noteText = JSON.stringify(note)+"\n";
	fs.appendFile("notes.json", noteText, function() {
		res.end();
	});
});

app.listen(3000);

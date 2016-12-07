var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.listen(3000);

app.get('/notes', function (req, res) {
    fs.readFile('notes.json', function(err, result){
        if (result) {
            result = '' + result;
            result = result.substring(0, result.length - 1);
            result = '[' + result + ']';
            result = result.split('\n').join(',');
            res.send(result);
        } else {
            res.end();
        }
    });
});

app.post('/notes', function (req, res) {
    var note = req.body;
    var noteText = JSON.stringify(note) + '\n';
    fs.appendFile('notes.json', noteText, function (err) {
        if (err) console.log('Smth wrong');
        res.end();
    });
});

app.delete('/notes', function (req, res) {
    var id = req.query.id;
    var notes = req.session.notes||[];
    var updatedNotesList = [];
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    req.session.notes = updatedNotesList;
    res.end();
});
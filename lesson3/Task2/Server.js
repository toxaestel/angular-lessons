var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('tutor',
                new Server('localhost', 27017, {safe: true},
                    {auto_reconnect: true}, {}));

db.open(function () {
    console.log('Mongo DB is opened');
    db.collection('notes', function (error, notes) {
        db.notes = notes;
    });
});

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
    var sortOrder = req.body.params.orderBy;
    db.notes.find(req.query).sort({sortOrder: 1}).toArray(function (err, items) {
        res.send(items);
    });
});

app.post('/notes', function (req, res) {
    db.notes.insert(req.body);
    res.end();
});

app.delete('/notes', function (req, res) {
   var id = new ObjectID(req.query.id);
   db.notes.remove({_id: id}, function (err) {
       if (err) {
            console.log(err);
            res.send('Failed');
       } else {
            res.send('Success');
       }
   });
});

app.put('/notes', function (req, res) {
    var orderID = req.body.params.orderID;
    console.log(req.body.params);
    if (orderID != 0) {
        db.notes.update({"orderID": orderID}, {$set: {orderID: orderID - 1}});
        db.notes.update({"orderID": orderID - 1}, {$set: {orderID: orderID}});
    }
    res.end();
});
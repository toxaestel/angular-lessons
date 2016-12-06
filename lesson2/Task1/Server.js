var express = require('express');
var app = express();
app.use(express.static('public'));

app.listen(3000);

app.get('/greeting', function (req, res) {
    res.send('Hello, ' + req.query.name + '! I\'m server!');
});
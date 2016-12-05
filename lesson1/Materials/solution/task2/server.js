var express = require('express');
var app = express();
var path = require('path');

//app.use(express.bodyParser()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get("/greeting", function(req,res) {
	res.send("Hello, "+req.query.name+"!");
});


app.listen(3000);

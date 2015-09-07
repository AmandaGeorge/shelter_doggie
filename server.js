var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/shelterdoggie'
);

//set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index file
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Server running on localhost:3000')
});
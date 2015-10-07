//require express and other modules
var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Breed = require('./models/breed');

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/shelterdoggie'
);

// send back all breeds
// app.get('/api/breeds', function (req, res) {
// 	Breed.find({}, function (err, breeds) {
// 		res.json(breeds);
// 	});
// });

// send back all breeds that match user input
app.get('/api/breeds', function (req, res) {
	var targetSize = req.query.size;
	var targetExercise = req.query.exercise;
	var targetTraining = req.query.training;
	var targetGrooming = req.query.grooming;
	var targetCatfriendly = req.query.catfriendly;
	var targetProtective = req.query.protective;
	var targetAffection = req.query.affection;

	Breed.find({$and: [
		{size: targetSize}, 
		{exercise: targetExercise},
		{easytraining: targetTraining}, 
		{grooming: targetGrooming},
		{catfriendly: targetCatfriendly},
		{protection: targetProtective},
		{affection: targetAffection}
		]}, function (err, matches) {
		console.log('these are the matches: ' + matches);
		res.json(matches);
	});
});

// send back a single breed
app.get('/api/breeds/:id', function (req, res) {
	var targetId = req.params.id;

	Breed.findOne({_id: targetId}, function (err, foundBreed) {
		res.json(foundBreed);
	});
});

//set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index file
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Server running on localhost:3000')
});
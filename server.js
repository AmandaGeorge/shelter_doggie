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
	
	// function to format the array of desired characteristics
	function formatArr (targetArr, formattedArr) {
		for (var i = 0; i < targetArr.length; i++) {
			formattedArr.push({size:targetArr[i]})
		};
		return formattedArr;
	};
	// SIZE
	var targetSize = Object.keys(JSON.parse(req.query.size));
	// format size array for mongodb query 
	var formattedSize = [];
	var formattedSize = formatArr(targetSize, formattedSize);
	console.log(formattedSize);

	// EXERCISE
	var targetExercise = Object.keys(JSON.parse(req.query.exercise));
	// format exercise array for mongodb query
	var formattedExercise = [];
	var formattedExercise = formatArr(targetExercise, formattedExercise);
	console.log(formattedExercise);

	// TRAINING
	var targetTraining = Object.keys(JSON.parse(req.query.training));
	// format training array for mongodb query
	var formattedTraining = [];
	var formattedTraining = formatArr(targetTraining, formattedTraining);
	console.log(formattedTraining);

	// GROOMING
	var targetGrooming = Object.keys(JSON.parse(req.query.grooming));
	// format grooming array for mongodb query
	var formattedGrooming = [];
	var formattedGrooming = formatArr(targetGrooming, formattedGrooming);
	console.log(formattedGrooming);

	// CATFRIENDLY
	var targetCatfriendly = Object.keys(JSON.parse(req.query.catfriendly));
	// format catfriendly array for mongodb query
	var formattedCatfriendly = [];
	var formattedCatfriendly = formatArr(targetCatfriendly, formattedCatfriendly);
	console.log(formattedCatfriendly);

	// PROTECTIVE
	var targetProtective = Object.keys(JSON.parse(req.query.protective));
	// format protective array for mongodb query
	var formattedProtective = [];
	var formattedProtective = formatArr(targetProtective, formattedProtective);
	console.log(formattedProtective);

	// AFFECTION
	var targetAffection = Object.keys(JSON.parse(req.query.affection));
	// format affection array for mongodb query
	var formattedAffection = [];
	var formattedAffection = formatArr(targetAffection, formattedAffection);
	console.log(formattedAffection);

	Breed.find({$and: [
		{$or: formattedSize}, 
		{$or: formattedExercise},
		{$or: formattedTraining}, 
		{$or: formattedGrooming},
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
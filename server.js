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
	function formatArr (targetArr, characteristic, formattedArr) {
		for (var i = 0; i < targetArr.length; i++) {
			var obj = {};
			obj[characteristic] = targetArr[i];
			formattedArr.push(obj);
		};
		return formattedArr;
	};
	// //function to get values from query objects
	// function getKeysIfTrue (obj) {
	// 	var keys = Object.keys(obj);
	// 	console.log(keys);
	// 	var trueArr = [];
	// 	for (var i = 0; i < keys.length; i++) {
	// 		if (obj[keys[i]] === true) {
	// 			var key = obj[i];
	// 			console.log("key: " + key);
	// 			trueArr.push(key);
	// 		};
	// 	};
	// 	console.log("trueArr: " + trueArr);
	// 	return trueArr;
	// };

	// SIZE
	var targetSize = Object.keys(JSON.parse(req.query.size));
	var sizeKey = "size";
	// format size array for mongodb query 
	var formattedSize = [];
	var formattedSize = formatArr(targetSize, sizeKey, formattedSize);
	console.log(formattedSize);

	// EXERCISE
	var targetExercise = Object.keys(JSON.parse(req.query.exercise));
	var exerciseKey = "exercise";
	// format exercise array for mongodb query
	var formattedExercise = [];
	var formattedExercise = formatArr(targetExercise, exerciseKey, formattedExercise);
	console.log(formattedExercise);

	// TRAINING
	var targetTraining = Object.keys(JSON.parse(req.query.training));
	var trainingKey = "training";
	// format training array for mongodb query
	var formattedTraining = [];
	var formattedTraining = formatArr(targetTraining, trainingKey, formattedTraining);
	console.log(formattedTraining);

	// GROOMING
	var targetGrooming = Object.keys(JSON.parse(req.query.grooming));
	var groomingKey = "grooming";
	// format grooming array for mongodb query
	var formattedGrooming = [];
	var formattedGrooming = formatArr(targetGrooming, groomingKey, formattedGrooming);
	console.log(formattedGrooming);

	// CATFRIENDLY
	var targetCatfriendly = Object.keys(JSON.parse(req.query.catfriendly));
	var catfriendlyKey = "catfriendly";
	// format catfriendly array for mongodb query
	var formattedCatfriendly = [];
	var formattedCatfriendly = formatArr(targetCatfriendly, catfriendlyKey, formattedCatfriendly);
	console.log(formattedCatfriendly);

	// PROTECTIVE
	var targetProtective = Object.keys(JSON.parse(req.query.protective));
	var protectiveKey = "protective";
	// format protective array for mongodb query
	var formattedProtective = [];
	var formattedProtective = formatArr(targetProtective, protectiveKey, formattedProtective);
	console.log(formattedProtective);

	// AFFECTION
	var targetAffection = Object.keys(JSON.parse(req.query.affection));
	var affectionKey = "affection";
	// format affection array for mongodb query
	var formattedAffection = [];
	var formattedAffection = formatArr(targetAffection, affectionKey, formattedAffection);
	console.log(formattedAffection);

	Breed.find({$and: [
		{$or: formattedSize}, 
		{$or: formattedExercise},
		{$or: formattedTraining}, 
		{$or: formattedGrooming},
		{$or: formattedCatfriendly},
		{$or: formattedProtective},
		{$or: formattedAffection}
		// {$or: [ { size: 's' }, { size: 'm' } ]},
		// {$or: [ { exercise: 'two' }, { exercise: 'three' } ]},
		// {$or: [ { training: 'two' }, { training: 'three' } ]},
		// {$or: [ { grooming: 'two' }, { grooming: 'three' } ]},
		// {$or: [ { catfriendly: 'two' }, { catfriendly: 'three' } ]},
		// {$or: [ { protective: 'two' }, { protective: 'three' } ]},
		// {$or: [ { affection: 'three' }, { affection: 'four' } ]}
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
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BreedSchema = new Schema({
	size: String,
	catfriendly: Number,
	easytraining: Number,
	watchdog: Number,
	grooming: Number,
	coldtolerant: Number,
	temperament: String,
	breed: String,
	pictureurl: String,
	care: String,
	energy: Number,
	playfulness: Number,
	dogfriendly: Number,
	strangerfriendly: Number,
	protection: Number,
	heattolerant: Number,
	exercise: Number,
	affection: Number,
	infourl: String
});

var Breed = mongoose.model('Breed', BreedSchema);

module.exports = Breed;
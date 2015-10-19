var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BreedSchema = new Schema({
	size: String,
	catfriendly: String,
	training: String,
	watchdog: String,
	grooming: String,
	coldtolerant: String,
	temperament: String,
	breed: String,
	pictureurl: String,
	care: String,
	energy: String,
	playfulness: String,
	dogfriendly: String,
	strangerfriendly: String,
	protective: String,
	heattolerant: String,
	exercise: String,
	affection: String,
	infourl: String
});

var Breed = mongoose.model('Breed', BreedSchema);

module.exports = Breed;
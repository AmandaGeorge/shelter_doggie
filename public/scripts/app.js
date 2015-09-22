var app = angular.module('shelterDoggie', ['ngRoute', 'ngResource']);

app.constant('HOST', 'http://localhost:3000') //DEV
// app.constant('HOST', 'http://yourdomain.herokuapp.com') //PRODUCTION

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'views/templates/welcome.html',
			controller: 'MainCtrl'
		})
		.when('/matches', {
			templateUrl: 'views/templates/matches.html',
			controller: 'MatchCtrl'
		})
		.when('/breed', {
			templateUrl: 'views/templates/breed.html',
			controller: 'BreedCtrl'
		})
		.otherwise({
		  redirectTo: '/'
		});
}]);

app.controller('MainCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
	$rootScope.answers = {};
	
	// show and hide questions
	$scope.size = true;
	$scope.exercise = false;
	$scope.training = false;
	$scope.grooming = false;
	$scope.catfriendly = false;
	$scope.protective = false;
	$scope.affection = false;

	// get started button
	$scope.sizeq = function () {
		$scope.size = false;
		$scope.exercise = true;
	};
	$scope.exerciseq = function () {
		$scope.exercise = false;
		$scope.training = true;
	};
	$scope.trainingq = function () {
		$scope.training = false;
		$scope.grooming = true;
	};
	$scope.groomingq = function () {
		$scope.grooming = false;
		$scope.catfriendly = true;
	};
	$scope.catfriendlyq = function () {
		$scope.catfriendly = false;
		$scope.protective = true;
	};
	$scope.protectiveq = function () {
		$scope.protective = false;
		$scope.affection = true;
	};
	// submit button
	$scope.affectionq = function () {
		console.log($rootScope.answers);
		// redirect to the match results page
		$location.path('/matches');
	};
}]);

app.controller('MatchCtrl', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {

	// parameters from user answers
	var size = $rootScope.answers.size;
	var exercise = $rootScope.answers.exercise;
	var training = $rootScope.answers.training;
	var grooming = $rootScope.answers.grooming;
	var catfriendly = $rootScope.answers.catfriendly;
	var protective = $rootScope.answers.protective;
	var affection = $rootScope.answers.affection;

	// query the db using user parameters
	$http.get('/api/breeds/'+size+'/'+exercise+'/'+training+'/'+grooming+'/'+catfriendly+'/'+protective+'/'+affection)
		.success(function (matches) {
			console.log(matches);
			$rootScope.matches = matches;
		})
		.error(function (res) {
			console.log("There was an error: " + res);
		});

	// click function for more info button
	$scope.breedInfo = function (match) {
		console.log(match._id);
		// get breed id from the clicked match
		$rootScope.breedId = match._id;
		// redirect to the breed info page
		$location.path('/breed');
	};
}]);

app.controller('BreedCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	$scope.breed = {};
	// show info for a particular breed
	$http.get('/api/breeds/'+ $rootScope.breedId)
		.success(function (breed) {
			console.log(breed);
			$scope.breed = breed;

			$scope.searchBreed();
		})
		.error(function (res) {
			console.log("There was an error: " + res);
		});

	$scope.searchBreed = function () {
		$scope.adoptables = [];
		var breed = $scope.breed.breed.replace(/\s\(Standard\)/, '');
		var url = 'http://api.petfinder.com/pet.find?animal=dog&breed='+ breed +'&location=94063&output=full&format=json&key=34919ce90a885d46886b391c924ffcb3&callback=JSON_CALLBACK'
		$http.jsonp(url)
			.then(function (response) {
				$scope.adoptables = response.data.petfinder.pets.pet;
				console.log(response.data.petfinder.pets.pet);
			});
	};
}]);

app.service('Breed', ['$resource', function ($resource) {
	return $resource('/api/breeds/:id', { id: '@_id'});
}]);










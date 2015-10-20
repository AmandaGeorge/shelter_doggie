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
	$scope.sizeDiv = true;
	$scope.exerciseDiv = false;
	$scope.training = false;
	$scope.grooming = false;
	$scope.catfriendly = false;
	$scope.protective = false;
	$scope.affection = false;

	// get started button
	$scope.sizeq = function () {
		$scope.sizeDiv = false;
		$scope.exerciseDiv = true;
		console.log($rootScope.answers.size);
	};
	$scope.exerciseq = function () {
		$scope.exerciseDiv = false;
		$scope.training = true;
		console.log($rootScope.answers.exercise);
	};
	$scope.trainingq = function () {
		$scope.training = false;
		$scope.grooming = true;
		console.log($rootScope.answers);
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

	// query the db using user answers
	$http
		.get('/api/breeds/search', {
			params: {
				'size': $rootScope.answers.size,
				'exercise': $rootScope.answers.exercise,
				'training': $rootScope.answers.training,
				'grooming': $rootScope.answers.grooming,
				'catfriendly': $rootScope.answers.catfriendly,
				'protective': $rootScope.answers.protective,
				'affection': $rootScope.answers.affection
			}
		})
		.success(function (matches) {
			console.log(matches);
			$rootScope.matches = matches;
		})
		.error(function (err) {
			console.log("There was an error: " + err);
			$scope.error = "500: Internal Server Error";
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
		.error(function (err) {
			console.log("There was an error: " + err);
			$scope.error = "500: Internal Server Error";
		});

	$scope.searchBreed = function () {
		$scope.adoptables = [];
		var breed = $scope.breed.breed.replace(/\s\(Standard\)|\s\(Miniature\)|\s\(Toy\)|\s\(or Gazelle Hound\)/, '');
		console.log(breed);
		var url = 'http://api.petfinder.com/pet.find?animal=dog&breed='+ breed +'&location=94063&output=full&format=json&key=34919ce90a885d46886b391c924ffcb3&callback=JSON_CALLBACK'
		console.log(url);
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










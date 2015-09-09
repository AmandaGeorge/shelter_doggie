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
		.otherwise({
		  redirectTo: '/'
		});
}]);

app.controller('MainCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

	$rootScope.answers = {};
	
	$scope.size = true;
	$scope.exercise = false;
	$scope.training = false;
	$scope.grooming = false;
	$scope.catfriendly = false;
	$scope.protective = false;
	$scope.affection = false;

	$scope.sizeq = function () {
		console.log($rootScope.answers);
		$scope.size = false;
		$scope.exercise = true;
	};
	$scope.exerciseq = function () {
		console.log($rootScope.answers);
		$scope.exercise = false;
		$scope.training = true;
	};
	$scope.trainingq = function () {
		console.log($rootScope.answers);
		$scope.training = false;
		$scope.grooming = true;
	};
	$scope.groomingq = function () {
		console.log($rootScope.answers);
		$scope.grooming = false;
		$scope.catfriendly = true;
	};
	$scope.catfriendlyq = function () {
		console.log($rootScope.answers);
		$scope.catfriendly = false;
		$scope.protective = true;
	};
	$scope.protectiveq = function () {
		console.log($rootScope.answers);
		$scope.protective = false;
		$scope.affection = true;
	};
	$scope.affectionq = function () {
		console.log($rootScope.answers);
		$location.path('/matches');
		
	};
}]);

app.controller('MatchCtrl', ['$scope', '$rootScope', 'Breed', function ($scope, $rootScope, Breed) {
	$scope.test = "Hello world";

	$scope.breeds = Breed.query();

	var size = $rootScope.answers.size;
	var exercise = $rootScope.answers.exercise;
	var training = $rootScope.answers.training;
	var grooming = $rootScope.answers.grooming;
	var catfriendly = $rootScope.answers.catfriendly;
	var protective = $rootScope.answers.protective;
	var affection = $rootScope.answers.affection;

	$scope.matches = Breed.query({
		size: size, 
		exercise: exercise,
		easytraining: training, 
		grooming: grooming,
		catfriendly: catfriendly,
		protection: protective,
		affection: affection
	});
	console.log($scope.matches);
}]);

app.service('Breed', ['$resource', function ($resource) {
	return $resource('/api/breeds/:id', { id: '@_id'});
}]);
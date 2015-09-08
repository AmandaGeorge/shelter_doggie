var app = angular.module('shelterDoggie', ['ngRoute', 'ngResource']);

app.constant('HOST', 'http://localhost:3000') //DEV
// app.constant('HOST', 'http://yourdomain.herokuapp.com') //PRODUCTION

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'views/templates/welcome.html',
			controller: 'MainCtrl'
		})
		.otherwise({
		  redirectTo: '/'
		});
}]);

app.controller('MainCtrl', ['$scope', 'Breed', function ($scope, Breed) {
	$scope.test = 'Hello world!';
	$scope.breed = {};
	$scope.breeds = [];
	$scope.breeds = Breed.query();
}]);

app.service('Breed', ['$resource', function ($resource) {
	return $resource('/api/breeds/:id', { id: '@_id'});
}]);
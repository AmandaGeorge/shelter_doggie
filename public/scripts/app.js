var app = angular.module('shelterDoggie', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'views/templates.index.html',
			controller: 'MainCtrl'
		});
}]);

app.controller('MainCtrl', ['$scope', function ($scope) {
		$scope.test = 'Hello world!';

}]);
angular.module('chat', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {templateUrl: 'template/login.html', controller: 'authenticationController'})
		.when('/register', {templateUrl: 'template/userDetail.html'})
		.when('/', {templateUrl: 'template/chat.html', controller: 'chatController'})
		.otherwise({ redirectTo: '/login' });
}]);

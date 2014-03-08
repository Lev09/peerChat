angular.module('chat', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {templateUrl: 'template/login.html'})
		.when('/register', {templateUrl: 'template/userDetail.html'})
		.when('/chat', {templateUrl: 'template/chat.html', controller: 'chatController'})
		.otherwise({ redirectTo: '/login' });
}]);

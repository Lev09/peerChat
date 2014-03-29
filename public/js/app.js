angular.module('chat', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {templateUrl: 'template/login.html'})
		.when('/signup', {templateUrl: 'template/userDetail.html', controller: "userController"})
		.when('/chat', {templateUrl: 'template/chat.html', controller: 'chatController'})
		.otherwise({ redirectTo: '/login' });
}]);

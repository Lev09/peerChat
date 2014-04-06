angular.module('chat').controller('authenticationController', ['$scope', '$location', 'authenticationService', function($scope, $location, authenticationService) {
	var controller = {
		init: function() {
			var conrtoller = this;
			controller.parent = $scope.$parent;
			
			this.switchPageIfLogedIn(controller.parent.user);
			
			$scope.login = function(user) {
				controller.login(user);
			};
		},
		
		switchPageIfLogedIn: function(user) {
			if(user.name) {
				this.changeLocationUrl("/");
			}
		},
		
		login: function(auth) {
			var conrtoller = this;
			if(auth.login != "" && auth.password != "") {
				authenticationService.login({
					user: auth,
					
					onSuccess: function(userName) {
						controller.parent.user.name = userName;
						controller.changeLocationUrl('/');
						$scope.$apply();
					},
		
					onError: function(error) {
						alert(JSON.stringify(error));
					}
					
				});	
			}
		},
		
		logout: function() {},
		
		changeLocationUrl: function(url) {
			$location.path(url);
		}
		
	};
	controller.init();
}]);

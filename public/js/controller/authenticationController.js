angular.module('chat').controller('authenticationController', function($scope, $location) {
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
				this.changeLocationUrl(user.name);
			}
		},
		
		login: function(auth) {
			var conrtoller = this;
			if(auth.login != "" && auth.password != "") {
				
				$.ajax({
					method: 'GET',
					url: '/auth',
					data: {
						user: auth
					},
					success: function(data) {
						controller.parent.user.name = data;
						controller.changeLocationUrl('/');
						$scope.$apply();
					},
		
					error: function(error) {
						alert(error);
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
});

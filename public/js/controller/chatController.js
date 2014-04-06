angular.module('chat').controller('chatController', function($scope, chatService, $location) {
	
	var controller = {
		
		onlineUsers: [],
		messages: [],
		receiver: {},
		
		interface: {

			reciveData: function(data) {
				controller.reciveData(data);
			},
			
			onError: function(error) {
				controller.onError(error);
			},
			
			online: function(id) {
				$scope.user.id = id;
			}
			
		},
		
		
		checkAuthentication: function() {
		
			if($scope.user.id) {
				this.makeMeOnline($scope.user);
			}
			else {
				$location.path('/login');
			}
		
		},
		
		makeMeOnline: function(user) {
			var controller = this;
			setInterval(
				function() {
					chatService.register({
						user: user,
		
						onSuccess: function(data) {
							$scope.onlineUsers = data;
							$scope.$apply();
						},
		
						onError: function(error) {
							controller.onError(error);
						}
		
					})
				}, 10000);
		},
		
		connectWhenChecked: function(id) {
			if (!this.receiver[id]) {
				this.interface.connectToUser(id);
			}
			else {
				this.disconnect(id);
			}
		},
		
		sendData: function(data, user) {
			if(data) {
				this.messages.push(chatService.modifyData(data, user));
				this.interface.sendData(data);
			}
			
			$("#messages").animate({
				scrollTop: $("#messages").height()
			}, 100);
		},
		
		reciveData: function(data) {
			controller.messages.push(chatService.modifyData(data, $scope.onlineUsers));
		},
		
		onError: function(error) {
			alert(error.message);
		},
		
		disconnect: function() {
			this.interface.disconnectConnection();
		},
		
		destroyPeer: function() {
			this.interface.destroyPeer();
		},
	
		init: function() {
			var controller = this;
			
			this.checkAuthentication();
			$scope.user = $scope.$parent.user;
			$scope.messages = this.messages;
			$scope.receiver = this.receiver;
			$scope.onlineUsers = this.onlineUsers;
			
			$scope.interface = this.interface;

			$scope.send = function(message) {
				controller.sendData(message, $scope.user);
				$scope.message = "";
			};
			
			$scope.connectWhenChecked = function(id) {
				controller.connectWhenChecked(id);
			};
		
			$scope.logout = function() {
				controller.destroyPeer();
			};
		}
		
	};
	
	controller.init();
	
});


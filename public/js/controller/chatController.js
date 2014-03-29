angular.module('chat').controller('chatController', function($scope, chatService, $location) {
	
	var controller = {
		
		onlineFriends: [],
		messages: [],
		recipient: {},
		
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
		
		init: function() {
			var controller = this;
			
			this.checkAuthontication();
			$scope.user = $scope.$parent.user;
			$scope.messages = this.messages;
			$scope.recipient = this.recipient;
			$scope.onlineFriends = this.onlineFriends;
			
			$scope.interface = this.interface;

			$scope.send = function(message) {
				controller.sendData(message, $scope.user);
				$scope.message = "";
			};
			
			$scope.connectWhenChecked = function(id) {
				controller.connectWhenChecked(id)
			};
		
			$scope.logout = function() {
				controller.destroyPeer();
			};
		},
		
		checkAuthontication: function() {
		
			if($scope.user.id) {
				this.makeMeOnline($scope.user);
			}
			else {
				$location.path('/login');
			}
		
		},
		
		makeMeOnline: function(user) {
			var controller = this;
			
			chatService.register({
				user: user,
		
				onSuccess: function(data) {
					data.pop(data[user.id]);
					$scope.onlineFriends = data;
					$scope.$apply();
				},
		
				onError: function(error) {
					controller.onError(error);
				}
		
			});
		},
		
		connectWhenChecked: function(id) {
			if (!this.recipient[id]) {
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
			controller.messages.push(chatService.modifyData(data, $scope.onlineFriends));
		},
		
		onError: function(error) {
			alert(error.message);
		},
		
		disconnect: function() {
			this.interface.disconnectConnection();
		},
		
		destroyPeer: function() {
			this.interface.destroyPeer();
		}
	
	};
	
	controller.init();
	
});

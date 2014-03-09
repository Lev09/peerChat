angular.module('chat').controller('chatController', ['$scope', 'chatService', function($scope, chatService) {
	
	var controller = {

		messages: [],
		recipient: {},
		
		interface: {

			reciveData: function(data){
				controller.reciveData(data);
			},
			
			onError: function(error) {
				controller.onError(error);
			},
			
			online: function(id) {
				controller.makeMeOnline({
					id: id,
					name: "Levon"
				});
			}
			
		},
		
		init: function() {
			var controller = this;
			$scope.user = {name: "Levon"};
			$scope.messages = this.messages;
			$scope.recipient = this.recipient;
			$scope.onlineFriends = [];
			
			$scope.interface = this.interface;

			$scope.send = function(message) {
				controller.sendData($scope.user, message);
				$scope.message = "";
			};
			
			$scope.connectWhenChecked = function(id) {
				controller.connectWhenChecked(id)
			};
		
			$scope.logout = function() {
				controller.destroyPeer();
			};

		},
		
		makeMeOnline: function(user) {
			var controller = this;
			
			chatService.register({
				user: user,
		
				onSuccess: function(data) {
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
		
		getModifiedDate: function() {	
			return chatService.getModifiedDate();
		},
		
		sendData: function(user, data) {
			if(data) {
				this.messages.push({author: user.name, content: data, date: this.getModifiedDate()});
				data.authorId = user.id;
				this.interface.sendData(data);						
			}
			
			$("#messages").animate({
				scrollTop: $("#messages").height()
			}, 100);
		},
		
		reciveData: function(data) {
			controller.messages.push(data);
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
	
}]);

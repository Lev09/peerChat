angular.module('chat').factory('chatService', function() {
	return {
	
		login: function(user) {
			$.ajax({
				method: 'GET',
				url: '/user' + user,
			
				success: function(user) {
					changeLocationUrl(user.login);
				},
	
				error: function(error) {
					alert(error);
				}
			});
		}
		
	};
});

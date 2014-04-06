angular.module('chat').factory('authenticationService', function() {
	return {
	
		login: function(config) {
			$.ajax({
				method: 'GET',
				url: '/auth',
				data: {
					user: config.user
				},
			
				success: function(data) {
					config.onSuccess(data);
				},
	
				error: function(error) {
					config.onError(error);
				}
				
			});
		}
		
	};
});

angular.module('chat').factory('chatService', function() {
	
	return {
	
		register: function(config) {
			$.ajax({
				url: '/online',
				method: 'POST',
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
		},
	
		getModifiedDate: function() {
			var date = new Date();
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var day = days[date.getDay()];
			var months = [
				"January","February","March","April",
				"May","June","July","August","September",
				"October","November","December"
			];
			var month = months[date.getMonth()];
			var year = date.getFullYear();
			var hour = date.getHours();
			var minute = date.getMinutes();
		
			return day + "/" + month + "/" + year + "  " + hour + ":" + minute;
		},
		
		modifyData: function(data, user) {
			if(user.constructor === Object) {
				return {
					author: user.name, 
					content: data,
					date: this.getModifiedDate()
				};
			}
			else {
				
				for(var i = 0; i < user.length; i++) {
					if(user[i].id === data.author) {
						data.author = user[i].name;
						data.date = this.getModifiedDate();
						return data;
					}
				}
				data.date = this.getModifiedDate();
				return data;
			}
		}
	
	};
});

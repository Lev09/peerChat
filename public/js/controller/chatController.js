angular.module('chat').controller('chatController', ['$scope', function($scope) {
	
	var controller = {
		messages: [],
		
		init: function() {
			$scope.user = "Levon";
			$scope.messages = this.messages;
			$scope.room = [{nik: 'lev'},{nik: 'ZXC'},{nik: 'Zorg'}];
			
			$scope.sendMsg = function(msg) {
				controller.sendMsg($scope.user, msg);
				$scope.msg = undefined;
			};
		},
	
		getModifiedDate: function() {
			var date = new Date();
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var day = days[date.getDay()];
			var months = ["January","February","March","April","May","June","July","August","September","October","November","December"
			];
			var month = months[date.getMonth()];
			var year = date.getFullYear();
			var hour = date.getHours();
			var minute = date.getMinutes();
		
			return day + "/" + month + "/" + year + "  " + hour + ":" + minute;
		},
	
		sendMsg: function(user, msg) {
			if(msg) {
				this.messages.push({autor: user, text: msg, date: this.getModifiedDate()});
			
				$("#messages").animate({
				    scrollTop: $("#messages").height()
				}, 100);
		  }
		}
		
	};
	
	controller.init();
	
}]);

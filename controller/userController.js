var userService = require("../service/userService");

module.exports = {
	
	createUser: function(req, res) {

		userService.createUser({
			
			user: req.body,
		
			error: function() {
				console.log(error);
			},
			
			success: function(user) {
				console.log(user);
			}	
		
		});	
	}
	
};

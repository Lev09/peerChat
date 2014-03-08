var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var UserSchema = new mongoose.Schema({

	userName: String,
	
	password: String,
	
	created: Date 
	
});

var DbUser = mongoose.model("user", UserSchema);

module.exports = {
	
	createUser: function(config) {
		var user = new DbUser(config.user);
		user.created = Date.now();
		
		DbUser.find({user: config.user}, function() {
			if ()
		});
		
		user.save(function(error, user) {
			if (error) {
				config.error(error);
			}else{
				config.success(user);
			}
		});
	},
	
	updateUser: function(config) {
		
	} 

};

var express = require('express');
var app = express();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use('/lib', express.static(__dirname + '/bower_components'));
	app.use(express.bodyParser());
});

var exist = function(array, object) {	
	for(var i = 0; i < array.length; i++) {
		if(array[i].name == object.name) {
			array[i] = object;
			return true;
			break;
		}
	}
	return false;
};

var onlineUsers = [];

app.get('/auth', function(req, res) {
	res.send(req.query.user.login);
});

app.post('/online', function(req, res) {
	var user = req.body.user;
	if(!exist(onlineUsers, user)) {
		onlineUsers.push(user);
	}
	res.send(onlineUsers);
	console.log(onlineUsers);
});

var port = 9000;
app.listen(port);
console.log("server is started on http://localhost:" + port);

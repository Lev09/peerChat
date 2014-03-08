var express = require('express');
var app = express();
var userController = require("./controller/userController");

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use('/lib', express.static(__dirname + '/bower_components'));
	app.use(express.bodyParser());
});

app.post("/newUser", userController.createUser);
app.update("/updateUser", userController.updateUser);

var port = 9000;
app.listen(port);
console.log("Server started on http://localhost:" + port);

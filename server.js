var express = require('express');
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String 
  });
  
var Users = mongoose.model("Users", userSchema);

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use('/lib', express.static(__dirname + '/bower_components'));
	app.use(express.bodyParser());
});

app.post("/signUpUser", function(req, res) {
  
  dbUser = new Users(req.body);
    console.log(dbUser);
  dbUser.save(function(error, user) {
    if(error) {
      console.log(error);
    }
    res.send(user);
  });
});

var port = 9000;
app.listen(port);
console.log("server is started on http://localhost:" + port);

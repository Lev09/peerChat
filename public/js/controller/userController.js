angular.module("chat").
controller("userController", function($scope, userService, $location) {
  
  var controller = {
    
    init: function() {
      var controller = this;
       
      $scope.saveUser = function() {
        controller.saveUser();
      }
    },
    
    saveUser: function(user) {
    
      if (!this.checkUser(user)) {
        userService.saveUser(user);
        //this.focus();
      }
      else {
        // TODO : display errors ! chat    
      }
    },
    
    checkUser: function(user) {
      if(user == null || "") {
        //alert("Fill the forms");
      }
    },
    
    focus: function() {
      $location.path("/home");
      
    }
    
  };
  
  controller.init();
  
});

var changecolor = function() {
  this.CSS.color = "red";
  console.log(this);
}; 
changecolor();
 var h = $("p");
h.onClick = changecolor;

//  console.log(h.onCnjbhbhb);


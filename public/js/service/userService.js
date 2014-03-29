angular.module("chat").
factory("userService", function() {
  
  return {
   
    saveUser: function(user) {
      $.ajax(
        {
          method: "POST",
          url: "/signUpUser",
          data: user,
          success: function(data) {
            alert(data);
          }
          
        }
      );
    }
  };
  
});

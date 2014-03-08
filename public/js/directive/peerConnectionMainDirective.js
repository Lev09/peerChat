angular.module('chat').directive('peerConnection', 'peerService', function(peerService) {

	return {
		restrict: 'E',
		replace: true,
		template: '<div><video id="localStream" autoplay muted></video></div>',
		
		scope: {
			interface: '='
		},				
		
		link: function(scope, elem, attr) {
			
			var directive = {
				
				init: function() {
					initInterface(scope.interface);
				  peerService.init(scope.interface, attr.key);
				},
				
				initInterface: function(interface) {
					
					interface.videoOnOff = function(id) {
						alert("this method isn't available for now !");
					};
					
					interface.connectToUser = function(id) {
						service.connect(interface, id);
					};
					
				},
				
				connect: function(id) {
					peerService.connect(scope.interface, id);
				}
				
			};
				
			directive.init();
		}
		
	};
	
});

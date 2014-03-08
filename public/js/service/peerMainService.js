angular.module('chat').factory('peerService', function() {
	
	return {
	
	  peers: [],
	
	  init: function(interface, key) {	  
	    if (this.peers[key] == null) {
	      this.peers[key] = new Peer({key:key});
	    }
	    
	    interface.key = key;
	    interface.peer = this.peers[key];
	    this.initConnectionEvent(interface);
	  },
	  
	  initConnectionEvent: function(interface) {
	  	var service = this;
	  	
	  	interface.peer.on('connection', function(connection) {
	  		service.initInterface(interface, connection);
				service.initConnection(interface, connection);
	  	});
	  	
	  },
	  
	  connect: function(interface, id) {
	    var service = this;
	    var connection;
	    if(!connection.open){	    
	    	connection = interface.peer.connect(id);
	    }

			connection.on('open', function() {
				service.initInterface(interface, connection);
				service.initConnection(interface, connection);
			});
	  
	  },
	  
		initInterface: function(interface, connection) {
      var service = this;

			interface.sendData = function(data) {
				service.sendData(connection, data);
			};

      interface.disconnectConnection = function() {
				service.disconnectConnection(connection);
			};

			interface.destroyPeer = function() {
				service.destroyPeer(interface);
			};

		},

		initConnection: function(interface, connection) {
      var service = this;
      
			connection.on('error', function(error) {
				service.notifyError(interface, error);
			});

			connection.on('data', function(data) {
				service.notifyDataReceived(interface, data);
			});					

		},
	  
		notifyDataReceived: function(interface, data) {
			interface.reciveData(data);
		},
			
		notifyError: function(interface, error) {
			interface.onError(error);
		},
		
		sendData: function(connection, data) {
			connection.send(data);
		},
		
		disconnectConnection: function(connection) {
		    connection.close();
		},
		
		destroyPeer: function(interface)	{
			interface.peer.destroy();
		  this.peers[interface.key] = null;	
		}
		
	};
	
});

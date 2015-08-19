var ConnectionService = function() {
  var connection_list = {};
  this.connectToServer = function(username, changeInterface) {
    this.peer = new Peer(username, {key: "iw4hkfqau6f4unmi"});
    this.peer.on("open", function() {
      changeInterface();
    });
    this.peer.on("error", function(error) {
      alert(error);
    });
  };
  this.listenForConnections = function(reportNewConnection, receiveMessage) {
    this.peer.on("connection", function(dataConnection) {
      reportNewConnection(dataConnection.peer);
      connection_list[dataConnection.peer] = dataConnection;
      dataConnection.on("data", function(data) {
        receiveMessage(dataConnection.peer, data);
      });
    });
  };
  this.sendContactRequest = function(target_contact, receiveRequestResponse, receiveMessage) {
    var dataConnection = this.peer.connect(target_contact);
    dataConnection.on("open", function() {
      connection_list[dataConnection.peer] = dataConnection;
    });
    dataConnection.on("data", function(data) {
      if(data == "--accepted_request--" || data == "--rejected_request--") {
        receiveRequestResponse(dataConnection.peer, data);
        if(data == "--rejected_request--") dataConnection.close();
      }
      else {
        receiveMessage(dataConnection.peer, data);
      }
    });
  };
  this.sendMessage = function(username, message) {
      connection_list[username].send(message);
  }
};

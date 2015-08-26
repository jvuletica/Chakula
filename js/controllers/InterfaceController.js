var InterfaceController = function ($scope, ConnectionService) {
	$scope.received_requests = {};
	$scope.sent_requests = {};
	$scope.my_contacts = {};
	$scope.username = ConnectionService.username;
	function reportNewConnection(peer_name) {
		$scope.$apply(function() {
			$scope.received_requests[peer_name] = {};
		});
	}
	function updateInterfaceWithContactRequest(target_contact) {
		$scope.sent_requests[target_contact] = {};
	}
	function receiveRequestResponse(name, response) {
		$scope.$apply(function() {
			delete $scope.sent_requests[name];
			if(response == "--accepted_request--") {
				$scope.my_contacts[name] = {
					"chat": [],
					"unread": false
				};
			}
		});
	}
	function receiveMessage(contact, message) {
		if($scope.my_contacts[contact]) {
			var date = new Date();
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			var chat_object = {
				"who": contact,
				"when": h + ":" + m + ":" + s,
				"what": message
			}
			$scope.$apply(function() {
				$scope.my_contacts[contact].chat.push(chat_object);
				if($scope.selected_contact != contact) {
					$scope.my_contacts[contact].unread = true;
				}
			});
		}
	}
	function sendResponse(contact, message) {
		ConnectionService.sendMessage(contact, message);
	}
	//starts listening for connections
	ConnectionService.listenForConnections(reportNewConnection, receiveMessage);

	//sets sidebar state to active on launch
	$scope.isSidebarActive = true;
	$scope.toggleSidebar = function() {
		$scope.isSidebarActive = !$scope.isSidebarActive;
	};
	$scope.log = function() {
		console.log($scope);
	};
	$scope.addContact = function(target_contact) {
		ConnectionService.
			sendContactRequest(target_contact, receiveRequestResponse, receiveMessage);
		updateInterfaceWithContactRequest(target_contact);
		$scope.condition = "";
		setTimeout(function() {
			$scope.$apply(function() {

			});
		}, 1500);
	};
	$scope.toggleAddContact = function() {
		if($scope.condition) $scope.condition = "";
		else $scope.condition = "add-contact"
	};
	$scope.respondToRequest = function(name, response) {
		delete $scope.received_requests[name];
		if(response == "--accepted_request--") {
			$scope.my_contacts[name] = {
				"chat": [],
				"unread": false
			};
		}
		sendResponse(name, response);
	};
	$scope.sendMessage = function(contact, message) {
		ConnectionService.sendMessage(contact, message);
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();
		var chat_object = {
			"who": "me",
			"when": h + ":" + m + ":" + s,
			"what": message
		}
		$scope.my_contacts[contact].chat.push(chat_object);
		delete $scope.message;
	}

};
InterfaceController.$inject = ["$scope", "ConnectionService"];

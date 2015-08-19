var InterfaceController = function ($scope, ConnectionService) {
	$scope.received_requests = {};
	$scope.sent_requests = {};
	$scope.my_contacts = {};
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
				$scope.my_contacts[name] = {};
			}
		});
	}
	function receiveMessage(contact, message) {
		alert(contact + " " + message);
	}
	function sendMessage(contact, message) {
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
	$scope.test = function(index, selected) {
		alert(index + " " + selected);
	};
	$scope.addContact = function(target_contact) {
		ConnectionService.sendContactRequest(target_contact, receiveRequestResponse, receiveMessage);
		updateInterfaceWithContactRequest(target_contact);
		$scope.condition = "result";
		$scope.contact_request_result = "Sent request.";
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.condition = "";
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
			$scope.my_contacts[name] = {};
		}
		sendMessage(name, response);
	};
	$scope.checkIfEnter = function(event, message) {
		if(event.which === 13) {
			sendMessage(name, message);
			$scope.message = "";
		}
	}

};
InterfaceController.$inject = ["$scope", "ConnectionService"];

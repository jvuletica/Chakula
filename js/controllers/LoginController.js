var LoginController = function($scope, $location, ConnectionService) {
	function changeInterfaceOnConnect() {
		$scope.$apply(function() {
			$location.path("/interface");
		});
	}
	$scope.connectToServer = function () {
		if($scope.username) {
			ConnectionService.connectToServer($scope.username, changeInterfaceOnConnect);
		}
		else alert("Username empty!");
	};
};
LoginController.$inject = ["$scope", "$location", "ConnectionService"];

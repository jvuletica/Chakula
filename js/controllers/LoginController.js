var LoginController = function($scope, $location, ConnectionService) {
	function changeInterfaceOnConnect() {
		$scope.$apply(function() {
			$location.path("/interface");
		});
	}
	function reportError(error) {
		$scope.login_btn_string = error;
		$scope.is_error = true;
		$scope.$apply();
		setTimeout(function(){
			$scope.login_btn_string = "Login";
			$scope.is_error = false;
			$scope.$apply();
		}, 2000);
	}
	$scope.login_btn_string = "Login";
	$scope.connectToServer = function () {
		if($scope.username) {
			ConnectionService.connectToServer($scope.username, changeInterfaceOnConnect, reportError);
		}
		else reportError("Username empty!");
	};
};
LoginController.$inject = ["$scope", "$location", "ConnectionService"];

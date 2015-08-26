var Chakula = new angular.module("Chakula", ["ngRoute"]);

Chakula.service("ConnectionService", ConnectionService);
Chakula.controller("LoginController", LoginController);
Chakula.controller("InterfaceController", InterfaceController);
Chakula.directive("receivedRequests", receivedRequests);
Chakula.directive("sentRequests", sentRequests);
Chakula.directive("myContacts", myContacts);
Chakula.directive("defaultSidebarControl", defaultSidebarControl);
Chakula.directive("addContactControl", addContactControl);

var configFunction = function($routeProvider) {
  $routeProvider.
  when("/", {
    templateUrl: "login.html",
    controller: "LoginController"
  });
  $routeProvider.
    when("/interface", {
    templateUrl: "interface.html",
    controller: "InterfaceController"
  });
};
configFunction.$inject = ["$routeProvider"];
Chakula.config(configFunction);

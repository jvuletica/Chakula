var Chakula = new angular.module("Chakula", ["ngRoute"]);

Chakula.service("ConnectionService", ConnectionService);
Chakula.controller("LoginController", LoginController);
Chakula.controller("InterfaceController", InterfaceController);
Chakula.directive("toggleClass", function() {
  return {
    restrict: "E",
    link: function(scope, element, attrs) {
      element.bind("click", function() {
        element.toggleClass(attrs.toggleClass);
      });
    }
  }
});

var configFunction = function($routeProvider) {
  $routeProvider.
  when("/", {
    templateUrl: "login.tpl",
    controller: "LoginController"
  });
  $routeProvider.
    when("/interface", {
    templateUrl: "interface.tpl",
    controller: "InterfaceController"
  });
};
configFunction.$inject = ["$routeProvider"];
Chakula.config(configFunction);

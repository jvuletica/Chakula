var receivedRequests = function() {
  return {
    restrict: "A",
    templateUrl: "received_requests.html"
  }
}
var sentRequests = function() {
  return {
    restrict: "A",
    templateUrl: "sent_requests.html"
  }
}
var myContacts = function() {
  return {
    restrict: "A",
    link: function(scope, el, attrs) {
      el.click(function() {
        scope.$apply(function() {
          scope.$parent.selected_index = scope.$index;
          scope.$parent.selected_contact = scope.name;
          scope.object.unread = false;
        });
      });
    },
    templateUrl: "my_contacts.html"
  }
}
var defaultSidebarControl = function() {
  return {
    restrict: "A",
    link: function(scope, el, attrs) {

    },
    templateUrl: "default_sidebar_control.html"
  }
}
var addContactControl = function() {
  return {
    restrict: "A",
    link: function(scope, el, attrs) {

    },
    templateUrl: "add_contact_control.html"
  }
}

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
          scope.$parent.selected_contact = scope.$index;
        });
      });
    },
    templateUrl: "my_contacts.html"
  }
}

(function() {
  angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope, $state, $timeout) {

    // Form data for the login modal
    $scope.registerData = {};

    // Perform the login action when the user submits the login form
    $scope.doRegister = function () {
      console.log('Doing register', $scope.registerData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $state.go('app.collection');
      }, 1000);
    };
  });
})();

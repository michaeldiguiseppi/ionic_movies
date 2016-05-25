(function() {
  angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope, $state, $timeout, authService, $ionicHistory, $ionicLoading) {

    // Form data for the login modal
    $scope.registerData = {};

    // Perform the login action when the user submits the login form
    $scope.doRegister = function() {
      $ionicLoading.show();
      authService.register($scope.registerData).then(function(data) {
        console.log(data);
        $ionicLoading.hide();
        authService.setUserInfo(data);
        $ionicHistory.nextViewOptions(
          { historyRoot: true }
        );
        $scope.registerData = {};
        $state.go('app.search', {reload: true});
      });
    };
  });
})();

(function() {
  angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope, $state, $timeout, authService, $ionicHistory, $ionicLoading) {
    // Form data for the register modal
    $scope.registerData = {};
    $scope.message = {};
    // Perform the register action when the user submits the register form
    $scope.doRegister = function() {
      $ionicLoading.show();
      authService.register($scope.registerData)
        .then(function(data) {
          $ionicLoading.hide();
          authService.setUserInfo(data);
          $ionicHistory.nextViewOptions(
            { historyRoot: true }
          );
          $scope.registerData = {};
          $scope.message = {};
          $state.go('app.search', {reload: true});
        })
        .catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {
            status: 'danger',
            data: 'Something went wrong. Please try again.'
          };
        });
    };
  });
})();

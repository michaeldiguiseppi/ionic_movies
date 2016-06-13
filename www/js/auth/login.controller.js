(function() {
  angular.module('starter.controllers')
  .controller('LoginCtrl', ['$scope', '$state', '$timeout', 'authService', '$ionicHistory', '$ionicLoading',
  function ($scope, $state, $timeout, authService, $ionicHistory, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.passData = {};
    $scope.message = {};
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $ionicLoading.show();
      authService.login($scope.loginData)
        .then(function(data) {
          $ionicLoading.hide();
          authService.setUserInfo(data);
          $ionicHistory.nextViewOptions(
            { historyRoot: true }
          );
          $scope.loginData = {};
          $scope.message = {};
          $state.go('app.collection', {reload: true});
        })
        .catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {
            status: 'danger',
            data: 'Email and/or password are incorrect.  Please try again.'
          };
        });
    };
  }]);
})();

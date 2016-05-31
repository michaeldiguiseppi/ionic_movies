(function() {
  angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $state, $timeout, authService, $ionicHistory, $ionicLoading) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    // $scope.$on('$ionicView.enter', function(e) {
    // });

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

  });
})();

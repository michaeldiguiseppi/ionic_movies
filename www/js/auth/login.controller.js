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
    $scope.registerData = {};

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $ionicLoading.show();
      console.log('Doing login', $scope.loginData);
      authService.login($scope.loginData).then(function(data) {
        console.log(data);
        $ionicLoading.hide();
        authService.setUserInfo(data);
        $ionicHistory.nextViewOptions(
          { historyRoot: true }
        );
        $scope.loginData = {};
        $state.go('app.collection', {reload: true});
      });
    };
  });
})();

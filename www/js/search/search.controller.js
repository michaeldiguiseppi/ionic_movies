(function() {
  angular.module('starter.controllers')
    .controller('SearchCtrl', ['$scope', 'httpService', '$ionicScrollDelegate', '$rootScope', '$ionicLoading',
    function($scope, httpService, $ionicScrollDelegate, $rootScope, $ionicLoading) {
      $scope.search = {};
      $scope.message = {};
      $scope.findMovie = function() {
        var title = $scope.search.title;
        $ionicLoading.show();
        httpService.getOneMovie(title)
        .then(function(data) {
          $ionicLoading.hide();
          $scope.result = data.data;
          $scope.lastSearch = $scope.search.title;
          $scope.search = {};
        }).catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', message: err };
        });
      };

      $scope.addCollection = function() {
        var data = $scope.result;
        $ionicLoading.show();
        httpService.addMovie(data)
        .then(function() {
          $ionicLoading.hide();
          $scope.message = {status: 'success', data: 'Movie added successfully.'};
          $scope.result = null;
          $ionicScrollDelegate.scrollTop();
        }).catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', data: err };
        });
      };
    }]);
})();

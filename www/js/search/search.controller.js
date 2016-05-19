(function() {
  angular.module('starter.controllers')
    .controller('SearchCtrl', ['$scope', 'httpService', '$ionicScrollDelegate', '$rootScope', '$ionicLoading',
    function($scope, httpService, $ionicScrollDelegate, $rootScope, $ionicLoading) {
      $scope.search = {};
      $scope.message = {};
      $scope.findMovie = function() {
        var title = $scope.search.title;
        httpService.getOneMovie(title)
        .then(function(data) {
          $scope.result = data.data;
          $scope.lastSearch = $scope.search.title;
          $scope.search = {};
        }).catch(function(err) {
          $scope.message = {status: 'danger', message: err };
        });
      };

      $scope.addCollection = function() {
        var data = $scope.result;
        httpService.addMovie(data)
        .then(function() {
          $scope.message = {status: 'success', data: 'Movie added successfully.'};
          $scope.result = null;
          $ionicScrollDelegate.scrollTop();
        }).catch(function(err) {
          $scope.message = {status: 'danger', data: err };
        });
      };
    }]);
})();

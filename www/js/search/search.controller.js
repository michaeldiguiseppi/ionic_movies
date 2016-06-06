(function() {
  angular.module('starter.controllers')
    .controller('SearchCtrl', ['$scope', 'httpService', '$ionicScrollDelegate', '$rootScope', '$ionicLoading', '$stateParams',
    function($scope, httpService, $ionicScrollDelegate, $rootScope, $ionicLoading, $stateParams) {
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
          $scope.message = {status: 'danger', data: err.data.data };
        });
      };

      if ($stateParams.title) {
        $scope.search.title = $stateParams.title;
        $scope.findMovie();
      }

      $scope.addCollection = function() {
        var data = $scope.result;
        $ionicLoading.show();
        httpService.addMovie(data, 'collection')
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

      $scope.addWishlist = function() {
        var data = $scope.result;
        $ionicLoading.show();
        httpService.addMovie(data, 'wishlist')
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

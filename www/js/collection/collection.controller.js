(function() {
  angular.module('starter.controllers')
    .controller('CollectionCtrl', ['$scope', 'httpService', function ($scope, httpService) {
      $scope.getMovies = function() {
        httpService.getAllMovies()
        .then(function(data) {
          $scope.movies = data.data;
        }).catch(function(err) {
          $scope.message = {status: 'danger', data: err};
        });
      };

      $scope.delete = function(id) {
        httpService.deleteMovie(id)
        .then(function(data) {
          $scope.getMovies();
        }).catch(function(err) {
          $scope.message = {status: 'danger', data: err};
        });
      };
    }]);
})();

(function() {
  angular.module('starter.controllers')
    .controller('CollectionCtrl', ['$scope', 'httpService', '$ionicLoading',
      function ($scope, httpService, $ionicLoading) {
        $scope.getMovies = function() {
          $ionicLoading.show();
          httpService.getAllMovies('collection')
          .then(function(data) {
            $ionicLoading.hide();
            $scope.movies = data.data;
          }).catch(function(err) {
            $ionicLoading.hide();
            $scope.message = {status: 'danger', data: 'There was an error getting your collection.  Please try again.'};
          });
        };

        $scope.delete = function(id) {
          httpService.deleteMovie(id, 'collection')
          .then(function(data) {
            $scope.getMovies();
          }).catch(function(err) {
            $scope.message = {status: 'danger', data: 'There was an error deleting the movie.  Please try again.'};
          });
        };
    }]);
})();

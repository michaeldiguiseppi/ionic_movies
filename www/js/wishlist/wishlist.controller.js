(function() {
  angular.module('starter.controllers')
    .controller('WishlistCtrl', ['$scope', 'httpService', '$ionicLoading', '$stateParams', '$state',
      function ($scope, httpService, $ionicLoading, $stateParams, $state) {
        $scope.getMovies = function() {
          $ionicLoading.show();
          httpService.getAllMovies('wishlist')
          .then(function(data) {
            $ionicLoading.hide();
            $scope.movies = data.data;
          }).catch(function(err) {
            $ionicLoading.hide();
            $scope.message = {status: 'danger', data: 'There was an error getting your wishlist.  Please try again.'};
          });
        };

        $scope.delete = function(id) {
          httpService.deleteMovie(id, 'wishlist')
          .then(function(data) {
            $scope.getMovies();
          }).catch(function(err) {
            $scope.message = {status: 'danger', data: 'There was an error deleting the movie.  Please try again.'};
          });
        };

        $scope.addCollection = function() {
          var data = $scope.movie;
          $ionicLoading.show();
          httpService.addMovie(data, 'collection')
          .then(function() {
            $ionicLoading.hide();
            $scope.message = {status: 'success', data: 'Movie added successfully.'};
            httpService.deleteMovie(data.imdbID, 'wishlist')
            .then(function(data) {
              $state.go('app.wishlist');
            }).catch(function(err) {
              $scope.message = {status: 'danger', data: 'There was an error deleting the movie.  Please try again.'};
            });
          }).catch(function(err) {
            $ionicLoading.hide();
            $scope.message = {status: 'danger', data: err };
          });
        };

        $scope.getWishlist = function() {
          $ionicLoading.show();
          httpService.getOneMovie($stateParams.title)
          .then(function(data) {
            $ionicLoading.hide();
            $scope.movie = data.data;
          }).catch(function(err) {
            $ionicLoading.hide();
            $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
          });
        };
    }]);
})();

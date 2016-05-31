(function() {
  angular.module('starter.controllers')
    .controller('MovieCtrl', ['$scope', 'httpService', '$stateParams', '$ionicLoading', '$state',
     function ($scope, httpService, $stateParams, $ionicLoading, $state) {
      $ionicLoading.show();
      httpService.getOneMovie($stateParams.title)
      .then(function(data) {
        $ionicLoading.hide();
        $scope.movie = data.data;
      }).catch(function(err) {
        $ionicLoading.hide();
        $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
      });

      $scope.delete = function(id) {
        httpService.deleteMovie(id)
        .then(function(data) {
          $state.go('app.collection');
        }).catch(function(err) {
          $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
        });
      };

      // TODO: Find API Routes for related movies/shows

      // TODO: Add correct API routing for finding streaming sources for TV shows.

    }]);
})();

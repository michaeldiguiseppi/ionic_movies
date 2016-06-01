(function() {
  angular.module('starter.controllers')
    .controller('MovieCtrl', ['$scope', 'httpService', '$stateParams', '$ionicLoading', '$state',
    '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
     function ($scope, httpService, $stateParams, $ionicLoading, $state, $ionicSlideBoxDelegate) {
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

      $scope.doSearch = function(id, type) {
        $ionicLoading.show();
        httpService.getRelated(id, type).then(function(results) {
            console.log(results);
            $ionicLoading.hide();
            $scope.related = results.data;
            setTimeout(function() {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
                $scope.$apply();
            });
        }).catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', data: 'There was a problem.  Please try again or try another movie.'};
        });
      };
    }]);
})();

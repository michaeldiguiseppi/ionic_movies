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
        })
        .catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
        });

      $scope.delete = function(id, location) {
        httpService.deleteMovie(id, location)
          .then(function(data) {
            if (location === 'collection') {
              $state.go('app.collection');
            } else {
              $state.go('app.wishlist');
            }
          })
          .catch(function(err) {
            $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
          });
      };

      $scope.addCollection = function() {
        var data = $scope.movie;
        $ionicLoading.show();
        httpService.addMovie(data, 'collection')
          .then(function() {
            $ionicLoading.hide();
            $scope.message = {status: 'success', data: 'Movie added successfully.'};
            $scope.result = null;
            $ionicScrollDelegate.scrollTop();
          })
          .catch(function(err) {
            $ionicLoading.hide();
            $scope.message = {status: 'danger', data: err };
          });
      };
      $scope.doSearch = function(id, type) {
        $ionicLoading.show();
        httpService.getRelated(id, type)
          .then(function(results) {
            $ionicLoading.hide();
            $scope.related = results.data;
            setTimeout(function() {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
                $scope.$apply();
            });
          })
          .catch(function(err) {
            $ionicLoading.hide();
            $scope.message = {status: 'danger', data: 'There was a problem.  Please try again or try another movie.'};
          });
      };
    }]);
})();

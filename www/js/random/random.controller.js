(function() {
  angular.module('starter.controllers')
    .controller('RandomCtrl', ['$scope', 'httpService', '$ionicLoading',
    function($scope, httpService, $ionicLoading) {
      $scope.getRandom = function() {
        $scope.movie = {};
        $ionicLoading.show();
        httpService.getAllMovies('collection').then(function(data) {
          var random = Math.floor(Math.random() * data.data.length);
          setTimeout(function() {
            $ionicLoading.hide();
            $scope.movie = data.data[random];
          }, 1000);
        }).catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
        });
      };
    }]);
})();

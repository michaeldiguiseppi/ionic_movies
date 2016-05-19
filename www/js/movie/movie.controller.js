(function() {
  angular.module('starter.controllers')
    .controller('MovieCtrl', ['$scope', 'httpService', '$stateParams', '$ionicLoading',
     function ($scope, httpService, $stateParams, $ionicLoading) {
      $ionicLoading.show();
      httpService.getOneMovie($stateParams.title)
      .then(function(data) {
        $ionicLoading.hide();
        $scope.movie = data.data;
      }).catch(function(err) {
        $ionicLoading.hide();
        $scope.message = {status: 'danger', data: err};
      });
    }]);
})();

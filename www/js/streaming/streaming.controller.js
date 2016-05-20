(function() {
  angular.module('starter.controllers')
    .controller('StreamCtrl', ['$scope', 'httpService', '$stateParams', '$ionicLoading',
    function($scope, httpService, $stateParams, $ionicLoading) {
      $ionicLoading.show();
      httpService.getStreamingSources($stateParams.id, $stateParams.type)
        .then(function(data) {
          $ionicLoading.hide();
          console.log(data);
          $scope.movie = data.data;
        })
        .catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', data: err};
        });

        $scope.GoToLink = function(url) {
          window.open(url,'_system');
        };

    }]);
})();

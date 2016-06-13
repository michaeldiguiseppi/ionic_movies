(function() {
  angular.module('starter.controllers')
    .controller('StreamCtrl', ['$scope', 'httpService', '$stateParams', '$ionicLoading',
    function($scope, httpService, $stateParams, $ionicLoading) {
      $ionicLoading.show();
      httpService.getStreamingSources($stateParams.id, $stateParams.type)
        .then(function(data) {
          $ionicLoading.hide();
          if (data.data.results) {
            $scope.message = {status: 'danger', data: 'There don\'t appear to be any streaming sources available at this time.  Please check back later.'};
          } else {
            $scope.movie = data.data;
          }
        })
        .catch(function(err) {
          $ionicLoading.hide();
          $scope.message = {status: 'danger', data: 'Something went wrong.  Please try again.'};
        });

        $scope.GoToLink = function(url) {
          window.open(url,'_system');
        };
    }]);
})();

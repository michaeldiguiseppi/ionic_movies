(function() {
  angular.module('starter.controllers')
    .controller('StreamCtrl', ['$scope', 'httpService', '$stateParams',function($scope, httpService, $stateParams) {
      httpService.getStreamingSources($stateParams.id)
        .then(function(data) {
          console.log(data);
          $scope.movie = data.data;
        })
        .catch(function(err) {
          $scope.message = {status: 'danger', data: err};
        });
    }]);
})();

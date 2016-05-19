(function() {
  angular.module('starter.controllers')
    .controller('MovieCtrl', ['$scope', 'httpService', '$stateParams', function ($scope, httpService, $stateParams) {
      httpService.getOneMovie($stateParams.title)
      .then(function(data) {
        $scope.movie = data.data;
      }).catch(function(err) {
        $scope.message = {status: 'danger', data: err};
      });
    }]);
})();

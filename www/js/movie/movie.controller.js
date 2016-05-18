(function() {
  angular.module('starter.controllers')
    .controller('MovieCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
      $http({
        method: 'GET',
        url: 'http://10.2.12.11:3000/api/movies',
      }).then(function(data) {
        $scope.movie = data.data.filter(function(mov) {
          return mov.Title === $stateParams.title;
        })[0];
      }).catch(function(err) {
        $scope.message = {status: 'danger', data: err};
      });
    }]);
})();

(function() {
  angular.module('starter.controllers')
    .controller('CollectionCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.getMovies = function() {
        $http({
          method: 'GET',
          url: 'http://10.2.12.11:3000/api/movies',
        }).then(function(data) {
          $scope.movies = data.data;
        }).catch(function(err) {
          $scope.message = {status: 'danger', data: err};
        });
      };
    }]);
})();

(function() {
  angular.module('starter.controllers')
    .controller('RandomCtrl', ['$scope', 'httpService', function($scope, httpService) {
      $scope.$on('$ionicView.enter', function(e) {
        $scope.movie = {};
        httpService.getAllMovies().then(function(data) {
          var random = Math.floor(Math.random() * data.data.length);
          console.log(data);
          console.log(random);
          $scope.movie = data.data[random];
        });
      });
    }]);
})();

(function() {
  angular.module('starter')
    .service('httpService', ['$http', '$rootScope', function($http, $rootScope) {
      // var baseUrl = 'http://10.2.12.11:3000/api';
      var baseUrl = 'http://192.168.1.231:3000/api';
      return {
        getAllMovies: function() {
          return $http({
            method: 'GET',
            url: baseUrl + '/movies',
          });
        },
        getOneMovie: function(title) {
          return $http({
            method: 'GET',
            url: baseUrl + '/movie/' + title,
          });
        },
        getStreamingSources: function(id, type) {
          return $http({
            method: 'GET',
            url: baseUrl + '/streaming/' + id + '/' + type
          });
        },
        getMovieTitle: function(upc) {
          return $http({
            method: 'GET',
            url: baseUrl + '/' + upc,
          });
        },
        addMovie: function(data) {
          return $http({
            method: 'POST',
            url: baseUrl + '/insert',
            data: data,
          });
        },
        deleteMovie: function(id) {
          return $http({
            method: 'PUT',
            url: baseUrl + '/delete/' + id + '/573c015010ea807de45121ac',
          });
        }
      };
    }]);
})();

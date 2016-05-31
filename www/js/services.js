(function() {
  angular.module('starter')
    .service('httpService', ['$http', '$rootScope', function($http, $rootScope) {
      var baseUrl = 'http://mmdb-api.herokuapp.com';
      return {
        getAllMovies: function() {
          return $http({
            method: 'GET',
            url: baseUrl + '/users/'+$rootScope.currentUser._id+'/movies',
          });
        },
        getOneMovie: function(title) {
          return $http({
            method: 'GET',
            url: baseUrl + '/movies/find/' + title,
          });
        },
        getStreamingSources: function(id, type) {
          return $http({
            method: 'GET',
            url: baseUrl + '/users/'+$rootScope.currentUser._id+'/streaming/' + id + '/' + type
          });
        },
        getMovieTitle: function(upc) {
          return $http({
            method: 'GET',
            url: baseUrl + '/movies/' + upc,
          });
        },
        getRelated: function(id, type) {
          return $http({
            method: 'GET',
            url: baseUrl + '/movies/related/' + id + '/' + type
          });
        },
        addMovie: function(data) {
          return $http({
            method: 'POST',
            url: baseUrl + '/users/'+$rootScope.currentUser._id+'/movie/add',
            data: data,
          });
        },
        deleteMovie: function(id) {
          // "/:userId/movies/:movieId"
          return $http({
            method: 'PUT',
            url: baseUrl + '/users/'+$rootScope.currentUser._id+'/movie/'+id+'/delete',
          });
        }
      };
    }])
    .service('authService', ['$http', '$window', '$ionicHistory', '$timeout',
      function($http, $window, $ionicHistory, $timeout) {
        var user = {};
        var baseUrl = 'http://mmdb-api.herokuapp.com';
        return {
          login: function(user) {
            return $http({
              method: 'POST',
              url: baseUrl + '/auth/login',
              data: user
            });
          },
          logout: function(user) {
            user = null;
            $window.localStorage.clear();
            $timeout(function () {
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
            },1000);
          },
          register: function(user) {
            return $http({
              method: 'POST',
              url: baseUrl + '/auth/register',
              data: user
            });
          },
          setUserInfo: function(userData) {
            console.log('userdata: ', userData);
            $window.localStorage.setItem('user', JSON.stringify(userData.data.message.user));
            $window.localStorage.setItem('token', JSON.stringify(userData.data.message.token));
          },
          getUserInfo: function() {
            $window.localStorage.getItem('user');
          }
        };
    }]);
})();

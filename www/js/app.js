// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngMessages'])
  .run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      // check if the splashscreen plugin exists
      if (navigator && navigator.splashscreen) {
        // hide the splashscreen 500ms after the view loads to give content time to load
        setTimeout(function() {
          navigator.splashscreen.hide();
        }, 500);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    cache: false,
    templateUrl: 'templates/menu.html',
    data: {
      requireLogin: false,
      blockLogin: false,
    }
  })
  .state('app.search', {
    url: '/search/:title',
    views: {
      'menuContent': {
        templateUrl: 'js/search/search.template.html',
        controller: 'SearchCtrl',
      }
    },
    data: {
      requireLogin: false,
      blockLogin: false,
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'js/auth/login.template.html',
        controller: 'LoginCtrl',
      }
    },
    data: {
      blockLogin: true,
      requireLogin: false,
    }
  })
  .state('app.logout', {
    url: '/logout',
    views: {
      'menuContent': {
        controller: function(authService, $state, $ionicHistory) {
          authService.logout();
          $ionicHistory.nextViewOptions(
            { historyRoot: true }
          );
          $state.go('app.login', {reload: true});
        },
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'js/auth/register.template.html',
        controller: 'RegisterCtrl',
      }
    },
    data: {
      blockLogin: true,
      requireLogin: false,
    }
  })
  .state('app.stream_series', {
    url: '/streaming/series/:type/:id',
    views: {
      'menuContent': {
        templateUrl: 'js/streaming/streaming_series.template.html',
        controller: 'StreamCtrl',
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.stream_movie', {
    url: '/streaming/movie/:type/:id',
    views: {
      'menuContent': {
        templateUrl: 'js/streaming/streaming.template.html',
        controller: 'StreamCtrl',
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.scan', {
    url: '/scan',
    views: {
      'menuContent': {
        templateUrl: 'js/scanner/scanner.template.html',
        controller: 'ScanCtrl',
      }
    },
    data: {
      requireLogin: false,
      blockLogin: false,
    }
  })
  .state('app.collection', {
    url: '/collection',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'js/collection/collection.template.html',
        controller: 'CollectionCtrl'
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.wishlist', {
    url: '/wishlist',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'js/wishlist/wishlist.template.html',
        controller: 'WishlistCtrl'
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.random', {
    url: '/random',
    views: {
      'menuContent': {
        templateUrl: 'js/random/random.template.html',
        controller: 'RandomCtrl'
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.single', {
    url: '/collection/:title',
    views: {
      'menuContent': {
        templateUrl: 'js/movie/movie.template.html',
        controller: 'MovieCtrl'
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  })
  .state('app.single_wish', {
    url: '/wishlist/:title',
    views: {
      'menuContent': {
        templateUrl: 'js/wishlist/wishlist_single.template.html',
        controller: 'WishlistCtrl'
      }
    },
    data: {
      requireLogin: true,
      blockLogin: false,
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

angular.module('starter')
  .run(function($rootScope, $state, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // set up requireLogin and blockLogin for routes.
      var requireLogin = toState.data.requireLogin;
      var blockLogin = toState.data.blockLogin;
      // set the current user into the rootScope.
      $rootScope.currentUser = JSON.parse($window.localStorage.getItem('user'));
      // if the route requires login and there isn't a user, redirect to the login route.
      if (requireLogin && !$rootScope.currentUser) {
        event.preventDefault();
        $state.go('app.login');
      }
      // if the route is blocked while logged in and there is a user, redirect to the collection.
      if (blockLogin && $rootScope.currentUser) {
        event.preventDefault();
        $state.go('app.collection');
      }
    });
  });

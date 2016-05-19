// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

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
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'js/search/search.template.html',
        controller: 'SearchCtrl',
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'js/auth/login.template.html',
        controller: 'LoginCtrl',
      }
    }
  })

  .state('app.logout', {
    url: '/logout',
    views: {
      'menuContent': {
        controller: 'LoginCtrl',
      }
    }
  })

  .state('app.streaming', {
    url: '/streaming/:id',
    views: {
      'menuContent': {
        templateUrl: 'js/streaming/streaming.template.html',
        controller: 'StreamCtrl',
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'js/auth/register.template.html',
        controller: 'RegisterCtrl',
      }
    }
  })

  .state('app.scan', {
      url: '/scan',
      views: {
        'menuContent': {
          templateUrl: 'js/scanner/scanner.template.html',
          controller: 'ScanCtrl',
        }
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
      }
    })

  .state('app.single', {
    url: '/collection/:title',
    views: {
      'menuContent': {
        templateUrl: 'js/movie/movie.template.html',
        controller: 'MovieCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/collection');
});


angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function ($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6, },
  ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

.controller('BrowseCtrl', function ($scope, $cordovaBarcodeScanner, $http, $ionicModal) {
  $scope.scan = function () {
    $cordovaBarcodeScanner.scan()
    .then(function (result) {
      console.log(result);
          $http({
            method: 'GET',
            url: 'http://10.2.12.11:3000/api/' + result.text,
          })
          .then(function (data) {
            console.log(data);

            alert(JSON.stringify(data.data));
              // $ionicModal.fromTemplateUrl('templates/result_modal.html', {
              //   scope: $scope,
              //   animation: 'slide-in-up'
              // }).then(function(modal) {
              //   $scope.modal = modal;
              // });
              // $scope.openModal = function() {
              //   $scope.modal.show();
              // };
              // $scope.closeModal = function() {
              //   $scope.modal.hide();
              // };
              // // Cleanup the modal when we're done with it!
              // $scope.$on('$destroy', function() {
              //   $scope.modal.remove();
              // });
              // // Execute action on hide modal
              // $scope.$on('modal.hidden', function() {
              //   // Execute action
              // });
              // // Execute action on remove modal
              // $scope.$on('modal.removed', function() {
              //   // Execute action
              // });
            })
        .catch(function (error) {
          alert('Scanning failed: ' + error);
        });
      });
    };
});

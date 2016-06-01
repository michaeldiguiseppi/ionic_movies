(function() {
  angular.module('starter.controllers')
  .controller('ScanCtrl', ['$scope', '$cordovaBarcodeScanner', 'httpService', '$ionicModal', '$state', '$ionicLoading',
    function ($scope, $cordovaBarcodeScanner, httpService, $ionicModal, $state, $ionicLoading) {
    $scope.scan = function () {
      $ionicModal.fromTemplateUrl('js/scanner/result_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $cordovaBarcodeScanner.scan()
      .then(function (result) {
        httpService.getMovieTitle(result.text)
        .then(function (data) {
          $scope.data = data.data;
          $scope.openModal();
        })
        .catch(function (error) {
          $scope.message = {status: 'danger', data: 'Something went wrong. Please try again.' };
        });
      });
    };

    $scope.addCollection = function() {
      var data = $scope.data;
      $ionicLoading.show();
      httpService.addMovie(data)
      .then(function() {
        $ionicLoading.hide();
        $scope.message = {status: 'success', data: 'Movie added successfully.'};
        $scope.closeModal();
      }).catch(function(err) {
        $ionicLoading.hide();
        $scope.message = {status: 'danger', data: 'Something went wrong. Please try again.' };
      });
    };

    $scope.addWishlist = function() {
      var data = $scope.data;
      $ionicLoading.show();
      httpService.addMovie(data, 'wishlist')
      .then(function() {
        $ionicLoading.hide();
        $scope.message = {status: 'success', data: 'Movie added successfully.'};
        $scope.result = null;
        $ionicScrollDelegate.scrollTop();
      }).catch(function(err) {
        $ionicLoading.hide();
        $scope.message = {status: 'danger', data: 'Something went wrong. Please try again.' };
      });
    };
  }]);
})();

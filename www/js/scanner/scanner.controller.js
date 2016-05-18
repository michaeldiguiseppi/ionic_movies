(function() {
  angular.module('starter.controllers')
  .controller('ScanCtrl', function ($scope, $cordovaBarcodeScanner, $http, $ionicModal) {
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
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });
      $cordovaBarcodeScanner.scan()
      .then(function (result) {
        console.log(result);
        $http({
          method: 'GET',
          // url: 'http://192.168.1.231:3000/api/' + result.text,
          url: 'http://10.2.12.11:3000/api/' + result.text,
        })
        .then(function (data) {
          console.log(data);
          $scope.data = data.data;
          // alert(JSON.stringify(data.data));
          $scope.openModal();
        })
        .catch(function (error) {
          alert('Scanning failed: ' + error);
        });
      });
    };

    $scope.addCollection = function() {
      var data = $scope.data;
      $http({
        method: 'POST',
        // url: 'http://192.168.1.231:3000/api/insert',
        url: 'http://10.2.12.11:3000/api/insert',
        data: data,
      }).then(function() {
        $scope.message = {status: 'success', data: 'Movie added successfully.' };
      }).catch(function(err) {
        $scope.message = {status: 'danger', data: err };
      });
    };
  });
})();

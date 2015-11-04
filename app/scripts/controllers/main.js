'use strict';

/**
 * @ngdoc function
 * @name pagespeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pagespeedApp
 */
angular.module('pagespeedApp')
  .controller('MainCtrl', ['$scope','$http', function ($scope, $http) {
    
    var key = 'AIzaSyA6Sgw_itJVMD33bd4hE4dRc--Vkws-tt8';
    var baseAPIUrl = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?filter_third_party_resources=true&strategy=mobile&key=';

    this.url = 'http://www.neimanmarcus.com/';

    //$scope.main.isProcessing = false;

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.onClick = function() {
      $scope.main.isProcessing = true;
      $scope.main.onSuccess = false;
      $scope.main.onError = false;

      $http.get(baseAPIUrl + key + '&url=' + this.url).then(
        function(res) {
          if (res && res.status === 200 && res.data) {
            var pageSpeedResponse = res.data;
            $scope.main.speed = {};
            $scope.main.usability = {};

            console.log(pageSpeedResponse);
            $scope.main.speed.score = pageSpeedResponse.ruleGroups.SPEED.score;
            $scope.main.usability.score = pageSpeedResponse.ruleGroups.USABILITY.score;

            $scope.main.formattedResults = pageSpeedResponse.formattedResults.ruleResults;

            $scope.main.isProcessing = false;
            $scope.main.onSuccess = true;
          }
        }, 
        function() {
          $scope.main.isProcessing = false;
          $scope.main.onError = true;
        }
      );

    };

  }]);

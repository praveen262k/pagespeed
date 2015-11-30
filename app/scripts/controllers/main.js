'use strict';

/**
 * @ngdoc function
 * @name pagespeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pagespeedApp
 */
angular.module('pagespeedApp')
  .controller('MainCtrl', [
         '$scope',
         '$http',
         'localStorageService',
      function (
         $scope ,
         $http,
         localStorageService) {
    
    var key = 'AIzaSyA6Sgw_itJVMD33bd4hE4dRc--Vkws-tt8';
    var baseAPIUrl = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?strategy=mobile';
    var storageKey = 'endpoint.history'; 

    //$scope.main.includeThirdParty = false;
            
    this.url = 'http://www.neimanmarcus.com/';

    var getHistory = function() {
      var history = localStorageService.get(storageKey);

      if (history === undefined || history === null) {
        history = [];
      } else {
        history = JSON.parse(history);
      }

      if (history.constructor !== Array ) {
        history = [];
      }

      return history;
    };

    //$scope.main.isProcessing = false;

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.showHistory = function() {
      var history = getHistory();

      $scope.main.searchHistory = history;
    };

    this.onClick = function() {
      if (!$scope.main.includeThirdParty) {
        $scope.main.includeThirdParty = false;
      }
      //alert($scope.main.includeThirdParty); return;
      $scope.main.isProcessing = true;
      $scope.main.onSuccess = false;
      $scope.main.onError = false;

      // Service code :)
      var endPoint = baseAPIUrl + '&filter_third_party_resources=' + !$scope.main.includeThirdParty + '&key=' + key + '&url=' + $scope.main.url;

      $http.get(endPoint).then(
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

            var history = getHistory();

            history.push({url: $scope.main.url, endPoint: endPoint, time: Date.now(), result: pageSpeedResponse});

            localStorageService.set(storageKey, JSON.stringify(history));

            //showHistory();
          }
        }, 
        function() {
          $scope.main.isProcessing = false;
          $scope.main.onError = true;
        }
      );

    };

  }]);

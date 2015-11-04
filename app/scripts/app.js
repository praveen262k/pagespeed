'use strict';

/**
 * @ngdoc overview
 * @name pagespeedApp
 * @description
 * # pagespeedApp
 *
 * Main module of the application.
 */
angular
  .module('pagespeedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    localStorageServiceProvider.setPrefix('com.nmo.pagespeed');
  });

  

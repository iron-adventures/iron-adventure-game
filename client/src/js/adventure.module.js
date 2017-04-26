(function() {
  'use strict';

    angular.module('adventure', ['ui.router'])
      .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('', '/');

      $stateProvider
        .state({
          name: 'start',
          url: '/',
          templateUrl: 'views/start.template.html',
          controller: 'PlayerController',
          controllerAs: 'playerCtrl'
        });
    }
  }());

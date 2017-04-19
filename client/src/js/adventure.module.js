(function() {
  'use strict';

    angular.module('adventure', ['ui.router'])
      .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('', '/');

      $stateProvider
        .state({
          name: 'gameplay',
          url: '/',
          templateUrl: 'templates/gameplay.html'
        });

    }
}());

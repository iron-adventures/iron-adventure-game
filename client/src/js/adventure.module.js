(function() {
  'use strict';

    angular.module('adventure', ['ui.router'])
      .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.otherwise('/not-found');

      $stateProvider
        .state({
          name: 'game',
          url: '/game',
          templateUrl: 'views/game.template.html',
          controller: 'SceneController',
          controllerAs: 'sceneCtrl'
        })
        .state({
          name: 'end',
          url: '/end',
          templateUrl: 'views/end.template.html',
          controller: 'SceneController',
          controllerAs: 'sceneCtrl'
        })
        .state({
          name: 'start',
          url: '/',
          templateUrl: 'views/start.template.html',
          controller: 'PlayerController',
          controllerAs: 'playerCtrl'
        })
        .state({
          name: '404-not-found',
          url: '/not-found',
          templateUrl: 'views/404.template.html',
        })
        .state({
          name: 'about',
          url: '/about',
          templateUrl: 'views/about.template.html',
        })
        .state({
          name: 'home',
          url: '/',
          templateUrl: 'views/start.template.html',
        })
        .state({
          name: 'login',
          url: '/login',
          templateUrl: 'views/login.template.html',
          controller: 'PlayerController',
          controllerAs: 'playerCtrl'
        });

    }
}());

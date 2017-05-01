(function() {
  'use strict';

  // create new Angular Controller
  angular.module('adventure')
    .controller('SceneController', SceneController);

  // inject the angular service that handles data calls for scene data
  SceneController.$inject =
    ['$state', '$stateParams', 'SceneService', 'PlayerService'];

  /**
   * SceneController creates a new scene Controller
   * @param {Object} SceneService Service singleton
   */
  function SceneController(
    $state, $stateParams, SceneService, PlayerService) {
    let vm = this;

    // store a copy of the SceneService.currentScene
    vm.currentScene = SceneService.getCurrentScene();

    // get the current player's email
    vm.playerEmail = localStorage.getItem('email');

    /**
     * Function loadScene() will load the current scene, or the next scene
     * @param  {String} inputId    Current scene ID provided to advance,
     *                             or 0 if we need to go to the next scene
     * @param  {String} inputText  Player choice
     * @param  {String} inputEmail Player email
     * @return {Object}            Scene data
     */
    vm.loadScene = function loadScene(inputId, inputText, inputEmail) {
      if (!inputId || inputId.length === 0 || typeof(inputId) !== 'string') {
        console.info('Valid id required to load a scene');
        return;
      }

      if (!inputText || inputText.length === 0 ||
        typeof(inputText) !== 'string') {
        console.info('Valid choice text required to load a scene');
        return;
      }

      if (!inputEmail || inputEmail.length === 0 ||
        typeof(inputEmail) !== 'string') {
        console.info('Valid email required to load a scene');
        return;
      }

      SceneService.loadScene(inputId, inputText, inputEmail)
        .then(function handleResponse(responseObj) {
          console.log('loadScene on controller responseObj is', responseObj);
          vm.currentScene = responseObj.data;
        })
        .catch(function handleError(error) {
          if (error.status === 401) {
            vm.hasError = true;
            vm.errorMessage = 'Scene not found';
          } else if (error.status === 404) {
            vm.hasError = true;
            vm.errorMessage = 'Could not find that scene by the id provided';
          } else {
            vm.hasError = true;
            vm.errorMessage = 'Unknown error from server';
          }
        });
    };

    /**
     * Function getEmail() returns the player email
     * @return {String} player email
     */
    vm.getEmail = function getEmail() {
      let emailReturned = PlayerService.getEmail();
      console.log('emailReturned is', emailReturned);
      return emailReturned;
    };

    /**
     * Function getCurrentScene() a) stores the currentScene Object
     *                            b) returns scene text for current scene
     * @return {String} Scene text from current scene
     */
    vm.getCurrentScene = function getCurrentScene() {
      vm.currentScene = SceneService.getCurrentScene();
      return vm.currentScene.sceneText;
    };

    /**
     * Function gotoLogin() changes view to start template
     * @return {void}
     */
    vm.gotoStart = function gotoStart() {
      $state.go('start');
    };
  }
}());

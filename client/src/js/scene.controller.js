(function() {
  'use strict';

  // create new Angular Controller
  angular.module('adventure')
    .controller('SceneController', SceneController);

  // inject the angular service that handles data calls for scene data
  SceneController.$inject = ['$state', '$stateParams', 'SceneService'];

  /**
   * [SceneController creates a new scene Controller]
   * @param {Object} SceneService [Service singleton]
   */
  function SceneController($state, $stateParams, SceneService) {
    let vm = this;

    vm.playerEmail = 'davidS@dude.com';  // store the current player's email

    vm.currentScene = {};  // store the scene to be displayed in the View

    vm.toggle = true;      // used toggle a CSS class based on a click event

    vm.loadScene = function loadScene(inputId, inputText, inputEmail) {
      if (!inputId || inputId.length === 0 || typeof(inputId) !== 'string') {
        console.info('Valid id required to load a scene');
        return;
      }
      console.info('did we get here?', inputId);

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
        vm.currentScene = responseObj;
        console.log('vm.currentScene loaded from database:', vm.currentScene);
      })
      .catch(function handleError(error) {
        if (error.status === 401) {
          vm.hasError = true;
          vm.errorMessage =
            'Scene not found';
        } else if (error.status === 404) {
          vm.hasError = true;
          vm.errorMessage =
            'Could not find that scene by the id provided';
        } else {
          vm.hasError = true;
          vm.errorMessage = 'Unknown error from server';
        }
      });
    };

  }
}());

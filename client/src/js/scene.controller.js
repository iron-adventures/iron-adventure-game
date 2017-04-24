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

    // vm.gClass = 'glyphicon glyphicon-flash';

    vm.currentScene = {};  // store the scene to be displayed in the View

    vm.toggle = true;    // used toggle a CSS class based on a click event

    vm.getScene = function getScene(id) {

      if (!id || id.length === 0 || typeof(id) !== 'string') {
        console.error('Valid id required to get a scene');
        return;
      }
      SceneService.getScene(id)
      .then(function handleResponse(responseObj) {
        vm.currentScene = responseObj;
        console.log('vm.currentScene = ', vm.currentScene);
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
    vm.getScene('58fd6c090a5d98dbe816cb4e');
  }
}());

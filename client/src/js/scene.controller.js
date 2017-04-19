(function() {
  'use strict';

  // create new Angular Controller
  angular.module('adventure')
    .controller('SceneController', SceneController);

  // inject the angular service that handles data calls for scene data
  SceneController.$inject = ['SceneService'];

  function SceneController(SceneService) {
    let vm = this;

    /**
     * [addAScene description]
     * @param {} newScene [description]
     */
    vm.addAScene = function addAScene(newScene) {
      // basic validation of the new scene object
      if (!newScene || Object.keys(newScene).length === 0 ||
        Array.isArray(newScene) || typeof(newScene) !== 'object') {
          console.log('Invalid scene Object provided');
          return;
        }
    };

    SceneService.addAScene(newScene)
      .then(function handleSceneData(sceneData) {
        console.log('The scene added was: ', sceneData);
      })
      .catch(function handleError(error) {
        if (error.status === 401) {
          vm.hasError = true;
          vm.errorMessage =
              'Please log in and try again';
        } else if (error.status === 404) {
          vm.hasError = true;
          vm.errorMessage =
              'Could not find that guest by the id provided';
        } else {
          vm.hasError = true;
          vm.errorMessage = 'Unknown error from server';
      }
    });
  }


}());

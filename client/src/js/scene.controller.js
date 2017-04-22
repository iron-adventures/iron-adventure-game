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

    console.log('getScene returned: ', vm.currentScene);

    // NOTE; testing for gameplay-branch
    // should be deleted prior to commit to master
    // vm.sceneCounter = 0;  // track current scene to display in template
    // vm.changeScene = function changeScene() {
    //   // );
    //   // console.log('vm.allscenes has', vm.allScenes);
    //   if (vm.sceneCounter === 0) {
    //     vm.currentScene = vm.allScenes[vm.sceneCounter];
    //     vm.sceneCounter++;
    //   }
    //   else if (vm.sceneCounter === 1){
    //     vm.currentScene = vm.allScenes[vm.sceneCounter];
    //     vm.sceneCounter--;
    //   }

      // if (vm.sceneCounter === 1) {
      //   vm.currentScene = {sceneText: 'Scene one shows here',
      //                      sceneChoice: 'option 1'};
      //   vm.sceneCounter++; // set to advance to the next scene
      // }
      // else if (vm.sceneCounter === 2) {
      //   vm.currentScene = {sceneText: 'Scene two shows here',
      //                      sceneChoice: 'option 2'};
      //   vm.sceneCounter--; // return to scene one the next time
      // }
    // };
    //
    // vm.getAllScenes = function getAllScenes() {
    //   SceneService.getAllScenes()
    //     .then(function handleResponse(responseObj) {
    //       vm.allScenes = responseObj;
    //       console.log('vm.allScenes is:', vm.allScenes);
    //     })
    //     .catch(function handleError(error) {
    //       if (error.status === 401) {
    //         vm.hasError = true;
    //         vm.errorMessage =
    //           'Please log in and try again';
    //       } else if (error.status === 404) {
    //         vm.hasError = true;
    //         vm.errorMessage =
    //           'Could not find that guest by the id provided';
    //       } else {
    //         vm.hasError = true;
    //         vm.errorMessage = 'Unknown error from server';
    //       }
    //     });
    // };
    //
    // vm.allScenes = vm.getAllScenes();
  }
}());

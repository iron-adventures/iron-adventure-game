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

    function getScene(id) {
      // basic validation of argument
      if (typeof(id) !== 'string' || id.length === 0) {
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

      vm.toggle = true;    // used toggle a CSS class based on a click event
      vm.testScenes = [
        {
          sceneImage: 'images/bedroom-1082262_960_720.jpg',
          sceneText: 'It is the morning of the first day of the coding bootcamp.',
          sceneChoices: [
            {
              choiceText: 'Get to the campus early since I\'ve never been there before.',
              choiceScore: 10
            },
            {
              choiceText: 'Hit that snooze button and get the most sleep possible.  Could be a long day.',
              choiceScore: 5
            },
            {
              choiceText: 'Let\'s keep our same routine, no sweat.',
              choiceScore: 5
            }
          ]
        },
        {
          sceneImage: 'images/3078856253_aa1e08579c_z.jpg',
          sceneText:
          'You\'ve been stuck on a homework problem for several hours',
          sceneChoices: [
            {
              choiceText: 'I own this problem.  Take whatever time is needed.',
              choiceScore: 5
            },
            {
              choiceText:
              'Take a break, then work on the problem for a final, set period of time.',
              choiceScore: 5
            },
            {
              choiceText:
              'Ask a fellow student or instructor for assistance.  Spend no more time on the problem.',
              choiceScore: 10
            }
          ]
        }
      ];
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

(function() {
  'use strict';

  angular.module('adventure')
    .factory('SceneService', SceneService);
  SceneService.$inject = ['$http'];

  /**
   * Creates a new SceneService
   * @param {Function} $http Makes Ajax calls
   * @return {Object}        The service's API methods
   */
  function SceneService($http) {
    /**
     * Function getScene() returns current scene for a player
     * @param  {String} inputEmail Player email
     * @return {Promise}
     */
    function getScene(inputEmail) {
      return $http({
        url: '/api/scenes/' + inputEmail,
        method: 'get',
        header: {
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(responseObj) {
        console.log('service responseObj is: ', responseObj);
        return responseObj.data;
      });
    }

    /**
     * Function loadScene() advances to the next scene
     * @param  {String} inputId    Current scene
     * @param  {String} inputText  Player choice
     * @param  {String} inputEmail Player email
     * @return {Promise}
     */
    function loadScene(inputId, inputText, inputEmail) {
      return $http({
        url: '/api/scenes/',
        method: 'patch',
        header: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson({
          inputId: inputId,
          inputText: inputText,
          inputEmail: inputEmail
        })
      })
      .then(function handleResponse(responseObj) {
        console.log('service responseObj is: ', responseObj);
        return responseObj.data;
      });
    }

    return {
      getScene: getScene,
      loadScene: loadScene
    };
  }
}());

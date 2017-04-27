(function() {
  'use strict';

  angular.module('adventure')
    .factory('SceneService', SceneService);
  SceneService.$inject = ['$http'];

  /**
   * [Creates a new SceneService]
   * @param {Function} $http [makes Ajax calls]
   * @return {Object}        The service's API methods
   */
  function SceneService($http) {

    /**
     * loadScene() advances to the next scene
     * @param  {String} inputId    current scene
     * @param  {String} inputText  player choice
     * @param  {String} inputEmail player email
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
        return responseObj.data;
      });
    }

    return {
      loadScene: loadScene
    };
  }

}());

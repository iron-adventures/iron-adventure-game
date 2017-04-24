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
     * [getScene gets a scene by id]
     * @param  {String} id [id string for a scene]
     * @return {Promise}
     */
    function getScene(id) {
      if (typeof(id) !== 'string' || id.length === 0) {
        return Promise.reject('Valid id required to get a scene');
      }

      return $http({
        url: 'http://127.0.0.1:3000/api/scenes/' + id,
        method: 'get',
        header: {
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(responseObj) {
        return responseObj.data;
      });
    }

    function loadScene(inputId, inputText) {
      return $http({
        url: 'http://127.0.0.1:3000/api/scenes/',
        method: 'patch',
        header: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson({
          id: inputId,
          choiceText: inputText
        })
      })
      .then(function handleResponse(responseObj) {
        return responseObj.data;
      });
    }

    return {
      getScene: getScene,
      loadScene: loadScene
    };
  }

}());

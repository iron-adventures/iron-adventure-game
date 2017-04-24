(function() {
  'use strict';

  angular.module('adventure')
    .factory('PlayerService', PlayerService);

  PlayerService.$inject = ['$http'];

  /**
   * Creates a new PlayerService singleton
   * @param {Function} $http  The service for making ajax calls
   * @return {Object}         The service's API methods
   */
  function PlayerService($http) {

    /**
     * Player inputs data
     * @param {String} playerName
     * @param {String} playerEmail
     * @return {Promise}
     */
    function loginPlayer(loginDetails) {
      if (typeof(loginDetails.playerName) !== 'string' || typeof(loginDetails.playerEmail) !== 'string') {
        return Promise.reject('Invalid information');
      }

      return $http({
        url: '/api/players',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: angular.toJson({ //request body
          playerName: loginDetails.playerName,
          playerEmail: loginDetails.playerEmail
        })
      })
        .then(function handleResponse(responseObj) {
          console.log('Response object', responseObj.data);
          return(responseObj.data);
        });

    }
    return {
      loginPlayer: loginPlayer
    };

  }


}());

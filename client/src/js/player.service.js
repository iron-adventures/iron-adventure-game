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
    console.log('Creating a PlayerService');


    /**
     * Player inputs data
     * @param {String} name
     * @param {String} email
     * @return {Promise}
     */
    function loginPlayer(loginDetails) {

      if (typeof(name) !== 'string' || typeof(email) !== 'string') {
        return Promise.reject('Invalid information');
      }

      return $http({
        url: '/api/players',
        method: 'post',
        headers: {
          'Content-Type': application/json
        },
        data: angular.toJson({
          name: loginDetails.name,
          email:  loginDetails.email
        })
      })
        .then(function handleResponse(responseObj) {
          return(responseObj.data);
        });

    }
    return {
      loginPlayer: loginPlayer
    };

  }


}());

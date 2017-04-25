(function() {
  'use strict';

  angular.module('adventure')
  .factory('PlayerService', PlayerService);

  PlayerService.$inject = ['$http'];

  /**
  * Creates a new PlayerService singleton
  * @param  {Function} $http  The service for making ajax calls
  * @return {Object}          The service's API methods
  */
  function PlayerService($http) {
    let playerEmail = localStorage.getItem('email');

    /**
    * Log in player with the API given user provided info
    * @param   {Object}    loginDetails   Object containing player name and email
    * @return  {Promise}
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
        playerEmail = responseObj.data.thePlayerAdded.playerEmail;
        localStorage.setItem('email', playerEmail);
        return(responseObj.data);
      });

    }

    /**
    * Returns the player's email
    * @return {String} The unique email for a player
    */
    function getEmail() {
      return email;
    }

    /**
    * Logs a player out of the system
    * @return {void}
    */
    function logout() {
      playerEmail = null;
      localStorage.removeItem('email');
    }


    return {
      loginPlayer: loginPlayer,
      getEmail: getEmail,
      logout: logout
    };

  }


}());

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
      if (!loginDetails) {
        return Promise.reject('Invalid information');
      }
      if(typeof(loginDetails.playerName) !== 'string'){
        return Promise.reject('Invalid information');
      }
      if(typeof(loginDetails.playerEmail) !== 'string'){
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
        playerEmail = responseObj.data.thePlayerAdded[0].playerEmail;
        localStorage.setItem('email', playerEmail);
        console.log('get here?');
        return(responseObj.data);
      });

    }

    /**
    * Returns the player's email
    * @return {String} The unique email for a player
    */
    function getEmail() {
      playerEmail = localStorage.getItem('email');
      return playerEmail;
    }

    /**
    * Logs a player out of the system
    * @return {void}
    */
    function logout() {

      return $http({
        url: '/api/players/logout',
        method: 'post',
        headers: {
          'Authorization': playerEmail
        }
      })
      .then(function handleResponse(responseObj) {
        console.info('The response', responseObj);
        playerEmail = null;
        localStorage.removeItem('email');
      });
    }


    return {
      loginPlayer: loginPlayer,
      getEmail: getEmail,
      logout: logout
    };

  }


}());

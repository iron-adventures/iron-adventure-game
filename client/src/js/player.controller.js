(function() {
  'use strict';

  angular.module('adventure')
    .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['$q', 'PlayerService', 'SceneService'];

  /**
   * Creates a PlayerController instance
   * @return {void}
   */
  function PlayerController($q, PlayerService, SceneService) {
    let vm = this;
    vm.playerInfo = {};
    vm.hasError = false;
    vm.message = null;

    /**
     * Signs the player into the application
     * @param  {Object}  playerInfo  Argument containing player name and email
     * @return {Promise}
     */
    vm.login = function login(playerInfo) {

      if (!playerInfo) {
        return $q.reject('Invalid data input');
      }
      if (!playerInfo.playerName || playerInfo.playerName.length === 0 ||
        typeof(playerInfo.playerName) !== 'string') {
        return $q.reject('Invalid input name');
      }
      if (!playerInfo.playerEmail || playerInfo.playerEmail.length === 0 ||
        typeof(playerInfo.playerEmail) !== 'string') {
        return $q.reject('Invalid input email');
      }
      return PlayerService.loginPlayer(playerInfo)
        .then(function handleResponseData(responseData) {
          SceneService.getScene(PlayerService.getEmail());
        })
        .catch(function handleErrors(errResponse) {
          vm.hasError = true;
          console.log('There was an error in attempting to login:', errResponse);
        });
    };
  }

}());

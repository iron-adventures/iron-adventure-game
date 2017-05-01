(function() {
  'use strict';

  angular.module('adventure')
    .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['PlayerService', 'SceneService'];

  /**
   * Handles the player info
   * @return {void}
   */
  function PlayerController(PlayerService, SceneService) {
    let vm = this;
    vm.playerInfo = {};
    vm.hasError = false;
    vm.message = null;

    /**
     * Logs in the player using name and email
     * @param  {Object}   playerInfo  Object containing the player name and email
     * @return {Promise}
     */
    vm.login = function login(playerInfo) {

      console.log("playerinfo is", playerInfo);

      if (!playerInfo) {
        return Promise.reject('Invalid data input');
      }
      if (!playerInfo.playerName || playerInfo.playerName.length === 0 ||
        typeof(playerInfo.playerName) !== 'string') {
        return Promise.reject('Invalid input name');
      }
      if (!playerInfo.playerEmail || playerInfo.playerEmail.length === 0 ||
        typeof(playerInfo.playerEmail) !== 'string') {
        return Promise.reject('Invalid input email');
      }
      return PlayerService.loginPlayer(playerInfo)
        .then(function handleResponseData(responseData) {
          console.log('responseData is', responseData);
          SceneService.getScene(PlayerService.getEmail());
        })
        .catch(function handleErrors(errResponse) {
          vm.hasError = true;
        });

    };
  }

}());

(function() {
  'use strict';

  angular.module('adventure')
    .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['$state', 'PlayerService'];

  /**
   * Handles the player info
   * @return {void}
   */
  function PlayerController($state, PlayerService) {
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
          $state.go('game');
        })
        .catch(function handleErrors(errResponse) {
          vm.hasError = true;
        });

    };

  }

}());

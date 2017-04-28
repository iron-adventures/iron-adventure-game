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
    vm.storedPlayer = null;

    /**
     * Player input (from client side)
     * @param  {Object}   playerInfo  Object containing the player's info
     * @return {Promise}
     */
    vm.login = function login(playerInfo) {

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

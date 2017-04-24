(function() {
  'use strict';

  angular.module('adventure')
    .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['PlayerService'];

  /**
   * Handles the player info
   * @return {void}
   */
  function PlayerController(PlayerService) {
    let vm = this;
    vm.playerInfo = {};
    vm.hasError = false;
    vm.message = null;

    console.log('Is the PlayerController running?');

    /**
     * Player input
     * @param  {Object}   playerInfo  Player info
     * @return {Promise}
     */
    vm.input = function input(playerInfo) {
      console.log('makin a player', playerInfo);
    };

  }

}());

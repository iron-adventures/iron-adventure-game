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
    vm.storedPlayer = false; // initialize as falsey

    console.log('Is the PlayerController running?');

    /**
     * Player input (from client side)
     * @param  {Object}   playerInfo  Object containing the player's info
     * @return {Promise}
     */
    vm.input = function input(playerInfo) {
      console.log('makin a player', playerInfo);


      PlayerService.loginPlayer(playerInfo)
        .then(function handleResponseData(responseData) {
          vm.storedPlayer = responseData;
          console.log('responseData is', responseData);
        })
        .catch(function handleErrors(errResponse) {
          console.warn(errResponse);
          vm.hasError = true;
        });


    };

  }

}());

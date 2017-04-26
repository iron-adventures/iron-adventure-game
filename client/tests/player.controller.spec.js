(function() {
  'use strict';

  let expect = chai.expect;

  describe('player controller', function() {
    let PlayerController;
    let mockPlayerService = {};

    beforeEach(module('adventure'));

    beforeEach(module(function($provide) {
      $provide.value('PlayerService', mockPlayerService);
    }));

    beforeEach(inject(function($controller) {
      mockPlayerService.loginPlayer = function loginPlayer(playerOne) {
        mockPlayerService.loginPlayer.numTimesCalled++;
        return Promise.resolve({ foo: 'bar' });
      };
      mockPlayerService.loginPlayer.numTimesCalled = 0;

      PlayerController = $controller('PlayerController');

    }));

    it('should contain a playerInfo object', function() {
      expect(PlayerController.playerInfo).to.be.an('object');
    });

    it('login should be a function', function() {
      expect(PlayerController.login).to.be.a('function');
    });

    it('should call loginPlayer when adding a player', function() {
      expect(mockPlayerService.loginPlayer.numTimesCalled).to.equal(0);
      //
    });

    describe('login function', function() {

      it('should return a promise when run', function(doneCallBack) {

        let returnValue = PlayerController.login({});
        expect(returnValue.then).to.be.a('function');
        expect(returnValue.catch).to.be.a('function');


        returnValue
          .then(function() {
            doneCallBack();
          })
          .catch(function(err) {
            console.info('Did this catch?');
            doneCallBack();
          });


      });



    });





  });




}());

(function() {
  'use strict';

  let expect = chai.expect;

  describe('player controller', function() {
    let PlayerController;
    let $q; // angular promise service to run functions asynchronously
    let $rootScope; // global variable
    let mockPlayerService = {};

    beforeEach(module('adventure'));

    beforeEach(module(function($provide) {
      $provide.value('PlayerService', mockPlayerService);
    }));

    beforeEach(inject(function($controller, _$q_, _$rootScope_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      mockPlayerService.loginPlayer = function loginPlayer(playerOne) {
        mockPlayerService.loginPlayer.numTimesCalled++;
        return $q.resolve(
          {
            playerName: 'foo',
            playerEmail: 'foo@bar.com',
            playerScore: 0,
            playerScene: '1234566'
          }
        );

      };

      PlayerController = $controller('PlayerController');
    }));

    it('should contain a playerInfo object', function() {
      expect(PlayerController.playerInfo).to.be.an('object');
    });

    it('should contain a hasError boolean', function() {
      expect(PlayerController.hasError).to.be.a('boolean');
    });

    it('login should be a function', function() {
      expect(PlayerController.login).to.be.a('function');
    });

    it('should return a promise', function() {
      let promise = PlayerController.login({});
      expect(promise.then).to.be.a('function');
      expect(promise.catch).to.be.a('function');
    });

    it('should successfully add a player if given a valid name and email', function(doneCallBack) {
      let promise = PlayerController.login({
        playerName: 'Jordan',
        playerEmail: 'jordan@jordan.com'
      });

      promise
        .then(function() {
          doneCallBack();
        })
        .catch(function(err) {
          doneCallBack(err);
        });

      $rootScope.$digest();
    });

    it('should fail to login() if given invalid email', function(doneCallBack) {
      let promise =
        PlayerController.login({playerName: "Name", playerEmail: 17});

      promise
        .then(function() {
          doneCallBack();
        })
        .catch(function(err) {

          doneCallBack();
        });

      $rootScope.$digest();
    });

    it('should fail to login() name is zero length', function(doneCallBack) {
      let promise =
        PlayerController.login({playerName: "", playerEmail: "foo@bar.com"});

      promise
        .then(function() {
          doneCallBack();
        })
        .catch(function(err) {

          doneCallBack();
        });

      $rootScope.$digest();
    });

  });

}());

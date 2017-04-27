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
      PlayerController = $controller('PlayerController');
    }));

    it('should contain a playerInfo object', function() {
      expect(PlayerController.playerInfo).to.be.an('object');
    });

    it('login should be a function', function() {
      expect(PlayerController.login).to.be.a('function');
    });

    describe('login function', function() {

      describe('successful player creation', function () {

        beforeEach(inject(function($controller) {
          mockPlayerService.loginPlayer = function loginPlayer(playerOne) {
            return Promise.resolve({playerName: 'foo', playerEmail: 'foo@bar.com'});
          };

          PlayerController = $controller('PlayerController');
        }));

        it('should return a promise', function(doneCallBack) {
          let promise = PlayerController.login({});
          expect(promise.then).to.be.a('function');
          expect(promise.catch).to.be.a('function');

          promise
            .then(function() {
              console.info('Was this successful?');
              doneCallBack();
            })
            .catch(function(err) {
              console.info('Did this catch?');
              doneCallBack();
            });

        });

        it('should successfully add a player if given a valid name', function(doneCallBack) {
          let promise = PlayerController.login({});

          promise
            .then(function() {
              expect(PlayerController.storedPlayer).to.be.an('object');
              expect(PlayerController.hasError).to.equal(false);
              doneCallBack();
            })
            .catch(function(err) {
              doneCallBack();
            });
        });

      });

      describe('failed player creation', function () {

        beforeEach(inject(function($controller) {
          mockPlayerService.loginPlayer = function loginPlayer(playerOne) {
            return $q.reject({message: "You must provide a name", time: Date.now() });
          };

          PlayerController = $controller('PlayerController');
        }));

        it('should fail to add player if given invalid name', function(doneCallBack) {
          let promise = PlayerController.login({});

          promise
            .then(function() {
              doneCallBack();
            })
            .catch(function(err) {
              expect(PlayerController.hasError).to.equal(true);
              doneCallBack();
            });

          $rootScope.$digest();
        });
      });


    });


  });


}());

(function() {
  'use strict';

  let expect = chai.expect;

  describe('player service', function() {
    let PlayerService;
    let $httpBackend;

    beforeEach(module('adventure'));

    beforeEach(inject(function(_$httpBackend_,_PlayerService_) {
      $httpBackend = _$httpBackend_;
      PlayerService = _PlayerService_;

      $httpBackend
        .whenPOST('/api/players')
        .respond({
          thePlayerAdded: {
            'id':'iughuiyghj8764567890',
            'playerName':'foo',
            'playerEmail':'foo@bar.com'
          }
        });
    }));

    afterEach(function() {
      localStorage.removeItem('email');
    });

    describe('loginPlayer', function() {

      it('should work if a valid name and email are provided', function(doneCallBack) {
        let promise = PlayerService.loginPlayer({playerName: 'foobar', playerEmail: 'foo@bar.com'});
        expect(promise.then).to.be.a('function');
        expect(promise.catch).to.be.a('function');

        promise
          .then(function() {
            expect(localStorage.getItem('email')).to.equal('foo@bar.com');
            doneCallBack();
          })
          .catch(function handleError(err) {
            doneCallBack(err);
          });

        // tells the fake server (backend) to release any held up responses
        $httpBackend.flush();

      });

      it('should fail to add a player given invalid name or email', function(doneCallBack) {
        let promise = PlayerService.loginPlayer({playerName: true, playerEmail: 'foo@bar.com'});
        expect(promise.then).to.be.a('function');
        expect(promise.catch).to.be.a('function');

        promise
          .then(function() {
            doneCallBack();
          })
          .catch(function handleError(err) {
            doneCallBack();
          });

      });


      });

    describe('getEmail', function() {

      it('should return player email when called', function() {
          localStorage.setItem('email', 'foobar@bar.com');
          let email = PlayerService.getEmail();
          expect(email).to.equal('foobar@bar.com');
      });

    });

  });





}());

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
        let returnValue = PlayerService.loginPlayer({ playerName: 'foobar', playerEmail: 'pfjfdjkfkgfjdgh'});
        expect(returnValue.then).to.be.a('function');
        expect(returnValue.catch).to.be.a('function');

        returnValue
        .then(function() {
          expect(localStorage.getItem('email')).to.equal('foo@bar.com');
          doneCallBack();
        })
        .catch(function handleError(err) {
          doneCallBack(err);
        });

        // tell the fake server (backend) to release any held up responses
        $httpBackend.flush();

      });

      });


  });





}());

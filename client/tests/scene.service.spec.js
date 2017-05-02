(function() {
  'use strict';

  let expect = chai.expect;

  describe('scene service', function() {
    let SceneService;
    let $httpBackend;

    beforeEach(module('adventure'));

    beforeEach(inject(function(_$httpBackend_, _SceneService_) {
      $httpBackend = _$httpBackend_;
      SceneService = _SceneService_;

      $httpBackend
        .whenPATCH('/api/scenes/')
        .respond({
          theSceneReturned:
          { id: '58ffe14978feb61989d68e07',
            sceneImage: 'images/3078856253_aa1e08579c_z.jpg',
            sceneText:
            'You\'ve been stuck on a homework problem for several hours',
            sceneChoices:
             [
               { _id: '58ffe14978feb61989d68e0a',
                 choiceScore: 5,
                 choiceText:
                 'I own this problem.  Take whatever time is needed.',
                 choiceIcon: 'glyphicon glyphicon-thumbs-up'
               },
               { _id: '58ffe14978feb61989d68e09',
                 choiceScore: 5,
                 choiceText:
                 'Work on the problem for a final, set period of time.',
                 choiceIcon: 'glyphicon glyphicon-flash'
               },
               { _id: '58ffe14978feb61989d68e08',
                 choiceScore: 10,
                 choiceText:
                 'Ask a fellow student or instructor for assistance.',
                 choiceIcon: 'glyphicon glyphicon-question-sign'
               }
             ]
           }
        });
    }));

    it('should return a promise from loadScene()', function(doneCallBack) {
      let returnValue = SceneService.loadScene(
        '58ffe14978feb61989d68e07',
        'I own this problem.  Take whatever time is needed.',
        'davidS@dude.com'
      );

      expect(returnValue.then).to.be.a('function');
      expect(returnValue.catch).to.be.a('function');

      returnValue
      .then(function handleError(responseObj) {
        expect(responseObj).to.be.a('Object');
        doneCallBack();
      })
      .catch(function handleError(err) {
        doneCallBack(err);
      });

      $httpBackend.flush();

    });

    it('should return a promise from getScene()', function(doneCallBack) {

    });



  });

}());

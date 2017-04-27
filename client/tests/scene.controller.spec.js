(function() {
  'use strict';

  let expect = chai.expect;

  describe('scene controller', function () {
    let SceneController;
    let mockSceneService = {};

    beforeEach(module('adventure'));  // same as an ng-app declaration

    // inject a provider service that can create controllers
    beforeEach(module(function($provide) {
      $provide.value('SceneService', mockSceneService);
    }));

    // mock loadScene() on the Angular Service
    beforeEach(inject(function($controller) {
      mockSceneService.loadScene = function loadScene(arg1, arg2, arg3) {
        mockSceneService.loadScene.numTimesCalled++;
        return Promise.resolve(
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
           });
      };

      mockSceneService.loadScene.numTimesCalled = 0;

      // instantiate the mock controller
      // which will have access to the functions from the mock service
      SceneController = $controller('SceneController');
    }));

    afterEach(inject(function($controller) {
      // clear email from localStorage before the next test
      // localStorage.removeItem('email');
    }));

    // it('should add 2+2', function() {
    //   expect(2+2).to.equal(4);
    // });

    it('should fail to loadScene() if input ID is invalid', function () {

      // attempt to pass inputID value of undefined
      let undefinedID;

      SceneController.loadScene(
        undefinedID,
        'I own this problem.  Take whatever time is needed.',
        'davidS@dude.com');

      expect(mockSceneService.loadScene.numTimesCalled).to.equal(0);
    });

  });

}());

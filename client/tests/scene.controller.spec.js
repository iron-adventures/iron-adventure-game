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

      mockSceneService.getCurrentScene = function getCurrentScene() {
        return {
          id: '58ffe14978feb61989d68e03',
          sceneImage: '/images/bedroom-1082262_960_720.jpg',
          sceneText: 'It is the morning of the first day of the coding bootcamp.',
          sceneChoices:
           [ { _id: '58ffe14978feb61989d68e06',
               choiceScore: 10,
               choiceText: 'Get to the campus early, never been there before.',
               choiceIcon: 'glyphicon glyphicon-flash' },
             { _id: '58ffe14978feb61989d68e05',
               choiceScore: 5,
               choiceText: 'Sleep in as much as possible, could be a long day.',
               choiceIcon: 'glyphicon glyphicon-bed' },
             { _id: '58ffe14978feb61989d68e04',
               choiceScore: 5,
               choiceText: 'Let\'s keep our same routine, no sweat.',
               choiceIcon: 'glyphicon glyphicon-thumbs-down' } ]
        };
      };

      mockSceneService.loadScene = function loadScene(arg1, arg2, arg3) {
        mockSceneService.loadScene.numTimesCalled++;
        return Promise.resolve(
          { id: '58ffe14978feb61989d68e07',
            sceneImage: 'images/3078856253_aa1e08579c_z.jpg',
            sceneText:
            'You\'ve been stuck on a homework problem for several hours',
            sceneChoices:
             [ { _id: '58ffe14978feb61989d68e0a',
                 choiceScore: 5,
                 choiceText:
                 'I own this problem.  Take whatever time is needed.',
                 choiceIcon: 'glyphicon glyphicon-thumbs-up' },
               { _id: '58ffe14978feb61989d68e09',
                 choiceScore: 5,
                 choiceText:
                 'Work on the problem for a final, set period of time.',
                 choiceIcon: 'glyphicon glyphicon-flash' },
               { _id: '58ffe14978feb61989d68e08',
                 choiceScore: 10,
                 choiceText:
                 'Ask a fellow student or instructor for assistance.',
                 choiceIcon: 'glyphicon glyphicon-question-sign' } ] });
                };

      mockSceneService.getEmail = function getEmail() {
        mockSceneService.getEmail.numTimesCalled++;
        return 'david@tir.com';

      };

      mockSceneService.getScene = function getScene(inputEmail) {
        mockSceneService.getScene.numTimesCalled++;
        return Promise.resolve(
          { id: '58ffe14978feb61989d68e07',
            sceneImage: 'images/3078856253_aa1e08579c_z.jpg',
            sceneText:
            'You\'ve been stuck on a homework problem for several hours',
            sceneChoices:
             [ { _id: '58ffe14978feb61989d68e0a',
                 choiceScore: 5,
                 choiceText:
                 'I own this problem.  Take whatever time is needed.',
                 choiceIcon: 'glyphicon glyphicon-thumbs-up' },
               { _id: '58ffe14978feb61989d68e09',
                 choiceScore: 5,
                 choiceText:
                 'Work on the problem for a final, set period of time.',
                 choiceIcon: 'glyphicon glyphicon-flash' },
               { _id: '58ffe14978feb61989d68e08',
                 choiceScore: 10,
                 choiceText:
                 'Ask a fellow student or instructor for assistance.',
                 choiceIcon: 'glyphicon glyphicon-question-sign' } ] });
      };

      // reset spy variables
      mockSceneService.getScene.numTimesCalled = 0;
      mockSceneService.loadScene.numTimesCalled = 0;
      mockSceneService.getEmail.numTimesCalled = 0;

      // instantiate the mock controller
      // which will have access to the functions from the mock service
      SceneController = $controller('SceneController');
    }));

    afterEach(inject(function($controller) {
      // clear email from localStorage before the next test
      // localStorage.removeItem('email');
    }));

    it('should fail to loadScene() if input ID is invalid', function () {
      // attempt to pass inputID value of undefined
      let undefinedID;
      let testEmail = 'david@tir.com';

      SceneController.loadScene(
        undefinedID,
        'I own this problem.  Take whatever time is needed.',
        testEmail);

      expect(mockSceneService.loadScene.numTimesCalled).to.equal(0);
    });

    it('should run SceneService.loadScene() with valid input', function () {
      SceneController.loadScene(
        '58ffe14978feb61989d68e07',
        'I own this problem.  Take whatever time is needed.',
        'david@tir.com');

        expect(mockSceneService.loadScene.numTimesCalled).to.equal(1);
    });

    it('should return the player email from getEmail()', function() {
      expect(mockSceneService.getEmail()).to.equal('david@tir.com');
    });

    it('should return a valid scene from getCurrentScene()', function() {
      expect(
        mockSceneService.getCurrentScene().id).to.equal('58ffe14978feb61989d68e03');
    });

  });

}());

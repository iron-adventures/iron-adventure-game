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
      
    }));













  });








}());

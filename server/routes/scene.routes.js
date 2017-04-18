const sceneRouter = require('express').Router();
const Scene = require('../models/Scene.model.js');

function addAScene(request, response, next) {
  console.log('Incoming', request.body);

  if(!request.body) {
    let err = new Error('You must provide a scene');
    err.status = 400;
    next(err);
    return;
  }

  let theSceneCreated = new Scene({
    sceneImage: request.body.sceneImage,
    sceneText: request.body.sceneText,
    sceneChoice: {
      choiceText: request.body.sceneChoice.choiceText,
      choiceScore: request.body.sceneChoice.choiceScore
    }
  });
  console.log(theSceneCreated);

  theSceneCreated.save()
    .then(function sendBackTheResponse(data) {
      response.json({ message: 'Added a scene', theSceneAdded: data });
    })
    .catch(function handleIssues(err) {
      console.error(err);
      let ourError = new Error('Unable to save new scene');
      ourError.status = 500;
      next(ourError);
    });
}

sceneRouter.post('/', addAScene);

module.exports = sceneRouter;

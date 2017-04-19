const sceneRouter = require('express').Router();
const Scene = require('../models/Scene.model.js');

function addAScene(request, response, next) {
  console.log('Incoming', request.body);

  if(!request.body || Object.keys(request.body).length === 0) {
    let err = new Error('You must provide a scene');
    err.status = 400;
    next(err);
    return;
    }
  if(!request.body.sceneImage || request.body.sceneImage.length === 0 ||
    typeof(request.body.sceneImage) !== 'string') {
    let err = new Error('You must provide an image');
    err.status = 400;
    next(err);
    return;
    }
  if(!request.body.sceneText || request.body.sceneText.length === 0 ||
    typeof(request.body.sceneText) !== 'string') {
    let err = new Error('You must provide the scene text');
    err.status = 400;
    next(err);
    return;
    }
  if(!request.body.sceneChoice || Object.keys(request.body.sceneChoice).length === 0) {
    let err = new Error('You must provide the scene choice');
    err.status = 400;
    next(err);
    return;
    }

  if(!request.body.sceneChoice.choiceText || request.body.sceneChoice.choiceText.length === 0 ||
    typeof(request.body.sceneChoice.choiceText) !== 'string') {
    let err = new Error('You must provide the choice text');
    err.status = 400;
    next(err);
    return;
    }
  if(!request.body.sceneChoice.choiceScore || Number.isNaN(Number(request.body.sceneChoice.choiceScore)) ||
    typeof(request.body.sceneChoice.choiceScore) !== 'number') {
      let err = new Error('You must provide a score');
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

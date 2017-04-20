const sceneRouter = require('express').Router();
const Scene = require('../models/Scene.model.js');

/**
 * Adds a scene to the database
 * @param {Object}   request    Must have a body like: { sceneImage: String}
 * @param {Object}   response   Getting back an object with the added scene
 */
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

/**
 * Retrieves a single scene from the database
 * @param   {Object}    request     Request provided with id
 * @param   {Object}    response    Responds with the new object for the client
 * @param   {Function}  next
 * @return  {Void}
 */
sceneRouter.get('/:id', function getAScene(request, response, next) {
  console.log('Request params', request.params); //prints out whole object

  Scene.findById(request.params.id)
    .then(function sendBackSingleScene(theSceneData) {
      if(!theSceneData) {
        let err = new Error('No scene with that id');
        err.status = 404;
        return next(err);
      }
      response.json(theSceneData);
      console.log(theSceneData);
    })
    .catch(function handleIssues(err) {
      console.error(err);
      let ourError = new Error('There was an error finding the scene with that ID');
      ourError.status = err.status;
      next(err);
    });
});

/**
 * [getAllScenes returns Array of all scene Objects]
 * @param  {Object}   request  [request Object]
 * @param  {Object}   response [response Object]
 * @param  {Function} next     [advances to next middleware component]
 * @return {Return}            [Array of scene Objects]
 */
sceneRouter.get('/', function getAllScenes(request, response, next) {
  Scene.find()
  .then(function sendAllScenes(allScenes) {
    return response.json(allScenes);
  })
  .catch(function handleErrors(err) {
    let ourError = new Error('Cannot retrieve scenes');
    ourError.status = 500;
    next(ourError);
  });
});

module.exports = sceneRouter;

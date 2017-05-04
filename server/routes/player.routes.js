const playerRouter = require('express').Router();
const Player = require('../models/Player.model.js');
const Scene = require('../models/Scene.model.js');

/**
 * Check if a player should be added to the database
 * @param {Object}   request  request data
 * @param {Object}   response response data
 * @param {Function} next     advance to next Express middleware
 */
function addAPlayer(request, response, next) {
  if(!request.body || Object.keys(request.body).length === 0) {
    let err = new Error('You must provide a player');
    err.status = 400;
    next(err);
    return;
  }
  if(!request.body.playerName || request.body.playerName.length === 0 ||
    typeof(request.body.playerName) !== 'string') {
    let err = new Error('You must provide a name');
    err.status = 400;
    next(err);
    return;
  }
  if(!request.body.playerEmail || request.body.playerEmail.length === 0 ||
    typeof(request.body.playerEmail) !== 'string') {
    let err = new Error('You must provide an email');
    err.status = 400;
    next(err);
    return;
  }

  getFirstScene()
    .then(function handleResponse(scene) {
      console.log('The first scene ID', scene);
      let getFirstSceneId = scene;
      Player.find({playerEmail: request.body.playerEmail})
        .then(function checkIfPlayerIsPresent(player) {
          if(player.length === 0) {
            let thePlayerCreated = new Player({
              playerName: request.body.playerName,
              playerEmail: request.body.playerEmail,
              playerScore: request.body.playerScore,
              playerScene: getFirstSceneId
            });
            console.log('The Player Created', thePlayerCreated);
            thePlayerCreated.save()
              .then(function sendBackTheResponse(data) {
                response.json({ message: 'Added a player', thePlayerAdded: data});
              })
              .catch(function handleIssues(err) {
                console.error(err);
                let ourError = new Error('Unable to save new player');
                ourError.status = 500;
                next(ourError);
              });
          } else {
            // return the existing player
            response.json(
              {
               message: 'Sign-in matches existing player:',
               thePlayerAdded: player[0]
              });
          }
        })
        .catch(function handleErrors(err) {
          let ourError = new Error('Unable to search with that email');
          ourError.status = err.status;
          next(err);
        });
      })
    .catch(function handleErrors(err) {
      console.error(err);
      let ourError = new Error ('Unable to find first scene');
      ourError.status = 500;
      next(ourError);
      });
}

/**
 * Return id of first scene, if it is the first scene
 * @return {String} If isFirstScene is true, return the scene _id
 * @return {void}   Or return nothing if the scene is not the first scene.
 */
function getFirstScene() {
  console.log('Did we get into getFirstScene?');
  return Scene.find({isFirstScene: true})
  .then(function readScene(data) {
    if (!data) {
      let err = new Error('Cannot find the first scene!');
      err.status = 404;
      return next(err);
    }
    return data[0]._id;
  })
  .catch(function handleIssues(err) {
    console.error(err);
    let ourError = new Error ('Unable to search for first scene');
    ourError.status = 500;
    throw ourError;
  });
}

playerRouter.post('/', addAPlayer);

module.exports = playerRouter;

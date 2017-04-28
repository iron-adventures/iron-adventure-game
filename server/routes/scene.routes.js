const sceneRouter = require('express').Router();
const Scene = require('../models/Scene.model.js');
const Player = require('../models/Player.model.js');

/**
 * Function getScene() retrieves current scene for that player
 * @param  {Object}   request  Request Object
 * @param  {Object}   response Response Object
 * @param  {Function} next     Advances to next Express middleware
 * @return {Object}            Data for current Scene
 */
sceneRouter.get('/:inputEmail', function getScene(request, response, next) {
  console.log('request.params.inputEmail =',request.params.inputEmail);
  if (!request.params.inputEmail ||
      typeof(request.params.inputEmail) !== 'string' ||
      request.params.inputEmail.length === 0) {
    let err = new Error('You must provide a player email ');
    err.status = 400;
    return next(err);
  }

  // last scene where we will return to the start page
  let scoreSceneId;
  let startSceneId;

  // data that will be updated while determining the next Scene
  let matchingScore;
  let thisScene;
  let returnThisScene;

  // data about the scene we returned
  let sceneReturned;

  console.log('inputEmail is', request.body.inputEmai);

  Player.find({ playerEmail: request.params.inputEmail})
    .then(function readPlayer(player) {
      if (!player) {
        let err = new Error(
          'That player does not exist, cannot load current scene!');
        err.status = 404;
        return next(err);
      }
      console.log('the current player\'s playerScene is ', player[0].playerScene);

      // return the player's current scene
      returnThisScene = player[0].playerScene;

      // Since we're loading the current scene,
      // do NOT increment the playerScore

      // So then we will obtain
      // the scene data for the player's current scene
      Scene.findById({_id: returnThisScene })
        .then(function readScene(data) {
          if (!data) {
            let err = new Error(
              'Cannot find the player\'s current scene!');
            err.status = 404;
            return next(err);
          }
          thisScene = data._id;

          // create the player's current scene data to be returned
          sceneReturned = {
            id: data._id,
            sceneImage: data.sceneImage,
            sceneText: data.sceneText,
            sceneChoices: data.sceneChoices
          };
          console.log('sceneReturned for current scene loop is', sceneReturned);
          response.json(sceneReturned);
        })
        .catch(function handleIssues(err) {
          let ourError = new Error ('Unable to search for current Scene');
          ourError.status = 500;
          next(err);
        });
      })
      .catch(function handleIssues(err) {
        let ourError = new Error ('Unable to find player');
        ourError.status = 500;
        next(err);
      });
});

/**
 * loadScene() returns the current Scene, or next Scene data
 * @param  {Object}   request  request Object
 * @param  {Object}   response response Object
 * @param  {Function} next     advances to next Express middleware
 * @return {Promise}
 */
sceneRouter.patch('/', function loadScene(request, response, next) {
  console.log('The request.body is', request.body);

  if (!request.body) {
    let err = new Error('You must provide scene and choice info');
    err.status = 400;
    return next(err);
  }

  // last scene where we will return to the start page
  let scoreSceneId;
  let startSceneId;

  // data that will be updated while determining the next Scene
  let matchingScore;
  let thisScene;
  let returnThisScene;

  // data about the scene we returned
  let sceneReturned;

  console.log('inputText is', request.body.inputText);

  // If inputId is zero, get the current scene for that player.
  // else if inputId is any other value,
  // then attempt to advance to the next scene.
  if (request.body.inputText === '0') {
    console.warn("Starting a New Game!");
    // NOTE:  return the player's currentScene and set to returnThisScene
    Player.find({ playerEmail: request.body.inputEmail})
      .then(function readPlayer(player) {
        if (!player) {
          let err = new Error(
            'That player does not exist, cannot load current scene!');
          err.status = 404;
          return next(err);
        }
        console.log('the current player\'s playerScene is ', player[0].playerScene);

        // return the player's current scene
        returnThisScene = player[0].playerScene;

        // Since we're loading the current scene,
        // do NOT increment the playerScore

        // So then we will obtain
        // the scene data for the player's current scene
        Scene.findById({_id: returnThisScene })
          .then(function readScene(data) {
            if (!data) {
              let err = new Error(
                'Cannot find the player\'s current scene!');
              err.status = 404;
              return next(err);
            }
            thisScene = data._id;

            // create the player's current scene data to be returned
            sceneReturned = {
              id: data._id,
              sceneImage: data.sceneImage,
              sceneText: data.sceneText,
              sceneChoices: data.sceneChoices
            };
            console.log('sceneReturned for current scene loop is', sceneReturned);
            response.json(sceneReturned);
          })
          .catch(function handleIssues(err) {
            let ourError = new Error ('Unable to search for current Scene');
            ourError.status = 500;
            next(err);
          });

      })
      .catch(function handleIssues(err) {
        let ourError = new Error ('Unable to find player');
        ourError.status = 500;
        next(err);
      });
    // NOTE:  the 'else' will be the "Scene.find" below
  } else {
    // find the scene that contains the choiceText that the player selected
    Scene.find({sceneChoices: {$elemMatch: {choiceText: request.body.inputText} } })
      .then(function readScene(data) {
        if (!data) {
          let err = new Error(
            'Cannot find scene that matches the player choice!');
          err.status = 404;
          return next(err);
        }
        console.log('The scene matching inputText is', data);

        // Set the scene to return (this will change later if
        // the current scene is the last scene)
        returnThisScene = data[0].sceneNext;

        // Save the current scene id...
        // we'll check later if this is the last scene
        thisScene = data[0]._id;

        console.log('thisScene =', thisScene);

        // look over the scene Object and obtain the matching score
        data[0].sceneChoices.forEach(function lookInSceneChoice(choice) {
          // console.log('choice in foreach is: ', choice);
          if (choice.choiceText === request.body.inputText) {
            matchingScore = choice.choiceScore;
          }
        });

        // create the scene to be returned
        sceneReturned = {
          id: data[0]._id,
          sceneImage: data[0].sceneImage,
          sceneText: data[0].sceneText,
          sceneChoices: data[0].sceneChoices
        };

        // update the playerScene and playerScore
        Player.find({ playerEmail: request.body.inputEmail})
        .then(function readPlayer(player) {
          if (!player) {
            let err = new Error(
              'That player does not exist, cannot advance to next scene!');
            err.status = 404;
            return next(err);
          }

          console.log('before modification, the player object is: ', player);

          // store the current scene in the player Object.
          // If player is trying to leave the last scene
          // (which is identified by scoreSceneId, then
          // set the next scene return to start of the game.
          // Also, reset the score zero
          if (thisScene === scoreSceneId) {
            returnThisScene = startSceneId;
            matchingScore = 0;
          }

          // create the new player Object
          let updatedPlayer = player[0];

          // Write the next scene ID and new score.
          // Note that the new score may
          // be zero if the player is leaving the last scene.
          updatedPlayer.playerScore += matchingScore;
          updatedPlayer.playerScene = returnThisScene;

          console.log('updatesPlayer contains: ', updatedPlayer);

          updatedPlayer.save(function saveproperty(err, revisedPlayer) {
            if (err) {
              let ourError = new Error ('Unable to update player!');
              ourError.status = 500;
              next(err);
            }
          });

          console.log('sceneReturned will be: ', sceneReturned);
          response.json(sceneReturned);
        })
        .catch(function handleIssues(err) {
          let ourError = new Error ('Unable to search for Scene');
          ourError.status = 500;
          next(err);
        });
      })
      .catch(function handleIssues(err) {
        let ourError = new Error (
          'Unable to search for Scene that matches the player choice!');
        ourError.status = 500;
        next(err);
      });
  }


});


sceneRouter.post('/', function addScene(request, response, next) {
    console.log('Incoming', request.body);

    if(!request.body) {
      let err = new Error('You must provide a scene');
      err.status = 400;
      next(err);
      return;
    }

    let theSceneCreated = new Scene({
      sceneNext: request.body.sceneNext,
      sceneImage: request.body.sceneImage,
      sceneText: request.body.sceneText,
      sceneChoices: request.body.sceneChoice //Storing the sceneChoices as an array
    });
    console.log('The scene created', theSceneCreated);

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

});

module.exports = sceneRouter;

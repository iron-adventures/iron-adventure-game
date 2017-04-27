const sceneRouter = require('express').Router();
const Scene = require('../models/Scene.model.js');
const Player = require('../models/Player.model.js');
//
// /**
//  * [addAScene adds a new Scene]
//  * @param {Object}   request  [request Object]
//  * @param {Object}   response [response Object]
//  * @param {Function} next     [advances to next middleware component]
//  */
// function addAScene(request, response, next) {
//   console.log('Incoming', request.body);
//
//   if(!request.body || Object.keys(request.body).length === 0) {
//     let err = new Error('You must provide a scene');
//     err.status = 400;
//     next(err);
//     return;
//     }
//   if(!request.body.sceneImage || request.body.sceneImage.length === 0 ||
//     typeof(request.body.sceneImage) !== 'string') {
//     let err = new Error('You must provide an image');
//     err.status = 400;
//     next(err);
//     return;
//     }
//   if(!request.body.sceneText || request.body.sceneText.length === 0 ||
//     typeof(request.body.sceneText) !== 'string') {
//     let err = new Error('You must provide the scene text');
//     err.status = 400;
//     next(err);
//     return;
//     }
//   if(!request.body.sceneChoice || Object.keys(request.body.sceneChoice).length === 0) {
//     let err = new Error('You must provide the scene choice');
//     err.status = 400;
//     next(err);
//     return;
//     }
//
//   if(!request.body.sceneChoice.choiceText || request.body.sceneChoice.choiceText.length === 0 ||
//     typeof(request.body.sceneChoice.choiceText) !== 'string') {
//     let err = new Error('You must provide the choice text');
//     err.status = 400;
//     next(err);
//     return;
//     }
//   if(!request.body.sceneChoice.choiceScore || Number.isNaN(Number(request.body.sceneChoice.choiceScore)) ||
//     typeof(request.body.sceneChoice.choiceScore) !== 'number') {
//       let err = new Error('You must provide a score');
//       err.status = 400;
//       next(err);
//       return;
//     }
//
//   let theSceneCreated = new Scene({
//     sceneImage: request.body.sceneImage,
//     sceneText: request.body.sceneText,
//     sceneChoice: {
//       choiceText: request.body.sceneChoice.choiceText,
//       choiceScore: request.body.sceneChoice.choiceScore
//     }
//   });
//
//   theSceneCreated.save()
//     .then(function sendBackTheResponse(data) {
//       response.json({ message: 'Added a scene', theSceneAdded: data });
//     })
//     .catch(function handleIssues(err) {
//       console.error(err);
//       let ourError = new Error('Unable to save new scene');
//       ourError.status = 500;
//       next(ourError);
//     });
// }
//
// sceneRouter.post('/', addAScene);

// /**
//  * [getAScene returns a single Scene by id]
//  * @param  {Object}   request  [request Object]
//  * @param  {Object}   response [response Object]
//  * @param  {Function} next     [advances to next middleware component]
//  * @return {Object}            [scene Object]
//  */
// sceneRouter.get('/:id', function getAScene(request, response, next) {
//   if (!request.body) {
//     let err = new Error('You must provide a scene');
//     err.status = 400;
//     return next(err);
//   }
//   Scene.findById({ _id: request.params.id})
//   .then(function sendBackScene(data) {
//     if (!data) {
//       let err = new Error('That scene does not exist!');
//       err.status = 404;
//       return next(err);
//     }
//     response.json({
//       id: data._id,
//       sceneImage: data.sceneImage,
//       sceneText: data.sceneText,
//       sceneChoices: data.sceneChoices
//     });
//   })
//   .catch(function handleIssues(err) {
//     let ourError = new Error ('Unable to search for Scene');
//     ourError.status = 500;
//     next(err);
//   });
// });

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
  let scoreSceneId = '58ffe14978feb61989d68e0b';
  let startSceneId = '58ffe14978feb61989d68e03';

  // data that will be updated while determining the next Scene
  let matchingScore;
  let thisScene;
  let returnThisScene;

  // data about the scene we returned
  let sceneReturned;

  console.log('inputText is', request.body.inputText);



  // If inputId is zero, get the current scene for that player.
  // If inputId is a String, then attempt to advance to the next scene
  if (request.body.inputText === '0') {
    // NOTE:  return the player's currentScene
    // NOTE:  do NOT increment the playerScore
    // NOTE:  the 'else' will be the "Scene.find" below
  }

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
      console.log('sceneReturned will be: ', sceneReturned);

      // update the playerScene and playerScore
      Player.find({ playerEmail: request.body.inputEmail})
      .then(function readPlayerScore(player) {
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

        console.log('sceneReturned is', sceneReturned);
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


  //
  // Scene.findById({ _id: request.body.id})
  // .then(function sendBackScene(data) {
  //   if (!data) {
  //     let err = new Error('That scene does not exist!');
  //     err.status = 404;
  //     return next(err);
  //   }
  //


    // return the next scene
    // Scene.findById({ _id: data.sceneNext})
    // .then(function sendBackNextScene(data) {
    //   if (!data) {
    //     let err = new Error('That scene does not exist!');
    //     err.status = 404;
    //     return next(err);
    //   }
    // })
    // .catch(function handleIssues(err) {
    //   let ourError = new Error ('Unable to search for Scene');
    //   ourError.status = 500;
    //   next(err);
    // });


      // NOTE:  we need to check if the current scene is the win/loss screen,
      // if so:
      // advance to the first game screen


    //
    //   response.json({
    //     id: data._id,
    //     sceneImage: data.sceneImage,
    //     sceneText: data.sceneText,
    //     sceneChoices: data.sceneChoices
    //   });
    // })
    // .catch(function handleIssues(err) {
    //   let ourError = new Error ('Unable to search for Scene');
    //   ourError.status = 500;
    //   next(err);
    // });


    // Add the score for that scene to the player score.
  //
  //   console.log('response object on node is', data);
  // })
  // .catch(function handleIssues(err) {
  //   let ourError = new Error ('Unable to search for Scene');
  //   ourError.status = 500;
  //   next(err);
  // });


  // NOTE: build a response object to the caller?  response.json(updatedPlayer);
});

module.exports = sceneRouter;

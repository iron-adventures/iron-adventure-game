const sceneRouter = require('express').Router();
const Scene = require('../models/Scene.model.js');
const Player = require('../models/Player.model.js');

/**
 * [addAScene adds a new Scene]
 * @param {Object}   request  [request Object]
 * @param {Object}   response [response Object]
 * @param {Function} next     [advances to next middleware component]
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
 * [getAScene returns a single Scene by id]
 * @param  {Object}   request  [request Object]
 * @param  {Object}   response [response Object]
 * @param  {Function} next     [advances to next middleware component]
 * @return {Object}            [scene Object]
 */
sceneRouter.get('/:id', function getAScene(request, response, next) {
  if (!request.body) {
    let err = new Error('You must provide a scene');
    err.status = 400;
    return next(err);
  }
  Scene.findById({ _id: request.params.id})
  .then(function sendBackScene(data) {
    if (!data) {
      let err = new Error('That scene does not exist!');
      err.status = 404;
      return next(err);
    }
    response.json({
      id: data._id,
      sceneImage: data.sceneImage,
      sceneText: data.sceneText,
      sceneChoices: data.sceneChoices
    });
  })
  .catch(function handleIssues(err) {
    let ourError = new Error ('Unable to search for Scene');
    ourError.status = 500;
    next(err);
  });
});

sceneRouter.patch('/', function loadScene(request, response, next) {
  console.log('The request.body is', request.body);

  if (!request.body) {
    let err = new Error('You must provide scene and choice info');
    err.status = 400;
    return next(err);
  }

  // calculate the score for the player's choice
  console.log('inputText is', request.body.inputText);
  Scene.find({sceneChoices: {$elemMatch: {choiceText: request.body.inputText} } })

  // Scene.find({sceneChoices.choiceText: request.body.inputText})
  .then(function readSceneScore(data) {
    if (!data) {
      let err = new Error(
        'Cannot find scene that matches the player choice!');
      err.status = 404;
      return next(err);
    }
    console.log('The scene matching inputText is', data);

    // look over the scene Object and obtain the matching score
    let matchingScore;

    console.log('data.sceneChoices is', data[0].sceneChoices);

    data[0].sceneChoices.forEach(function lookInSceneChoice(choice) {
      console.log('choice in foreach is: ', choice);
      if (choice.choiceText === request.body.inputText) {
        matchingScore = choice.choiceScore;
      }
    });
    console.log('matchingScore = ', matchingScore);



  })
  .catch(function handleIssues(err) {
    let ourError = new Error (
      'Unable to search for Scene that matches the player choice!');
    ourError.status = 500;
    next(err);
  });


  // NOTE:  we need to check if the current scene is the win/loss screen,
  // if so:  reset the player score to zero
  // NOTE:  don't bother trying to advance to next screen (or return error)
  // if the player is not found?
  // go to 404 page (or just post console error via error middleware)

  // update the player score
  // logic:
  //    a) read the current score
  //    b) add the new score and set this new value in an update()

  Player.find({ playerEmail: request.body.inputEmail})
  .then(function readPlayerScore(player) {
    if (!player) {
      let err = new Error(
        'That player does not exist, cannot advance to next scene!');
      err.status = 404;
      return next(err);
    }

    // console.log('we found the player array:', player);
    // console.log('the player object in the array is: ', player[0]);
    // console.log('we would like to input this inputId:', request.body.inputId);
    // console.log('player[0].playerScene is', player[0].playerScene);

    // store the current scene in the player Object
    // NOTE: need to use the sceneId below not inputId  !
    player[0].playerScene = request.body.inputId;

    player[0].save(function saveproperty(err, updatedPlayer) {
      if (err) {
        let ourError = new Error ('Unable to update player!');
        ourError.status = 500;
        next(err);
      }
    });

    console.log('playerScene is now', player[0].playerScene);
    // manipulate the data
    //       and SAVE the model

    /*
        db.Employee.update(
        {"Employeeid" : 1},
        {$set: { "EmployeeName" : "NewMartin"}});
     */

    // NOTE:  we need to also increment the player score
    // NOTE:  ** after ** we obtain the numeric value of the matching choiceText
    //        using:  $inc
    // so now we can attempt to update player's current scene id



  })
  .catch(function handleIssues(err) {
    let ourError = new Error ('Unable to search for Scene');
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

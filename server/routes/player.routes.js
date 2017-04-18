const playerRouter = require('express').Router();
const Player = require('../models/Player.model.js');

function addAPlayer(request, response, next) {
  console.log('Incoming', request.body);

  if(!request.body) {
    let err = new Error('You must provide a player');
    err.status = 400;
    next(err);
    return;
  }

  let thePlayerCreated = new Player({
    playerName: request.body.playerName,
    playerEmail: request.body.playerEmail,
    playerScore: request.body.playerScore
  });
  console.log(thePlayerCreated);

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
}

playerRouter.post('/', addAPlayer);

module.exports = playerRouter;

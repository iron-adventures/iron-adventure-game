const playerRouter = require('express').Router();
const Player = require('../models/Player.model.js');


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

  Player.find({playerEmail: request.body.playerEmail})
    .then(function checkIfPlayerIsPresent(player) {

      if(player.length === 0) {
        let thePlayerCreated = new Player({
          playerName: request.body.playerName,
          playerEmail: request.body.playerEmail,
          playerScore: request.body.playerScore,
          playerScene: '58ffe14978feb61989d68e03'
        });
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
          { message: 'Sign-in matches existing player:',
            thePlayerAdded: player[0] });
      }
    })
    .catch(function handleErrors(err) {
      let ourError = new Error('Unable to search with that email');
      ourError.status = err.status;
      next(err);
    });
}

playerRouter.post('/', addAPlayer);

module.exports = playerRouter;

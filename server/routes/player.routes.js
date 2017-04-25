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
    .then(function checkIfPlayerIsPresent(email) {
      if(email.length === 0) {
        let thePlayerCreated = new Player({
          playerName: request.body.playerName,
          playerEmail: request.body.playerEmail,
          playerScore: request.body.playerScore
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
        console.log('Player already exists');
      }
    })
    .catch(function handleErrors(err) {
      let ourError = new Error('Unable to search with that email');
      ourError.status = err.status;
      next(err);
    });
}

playerRouter.post('/', addAPlayer);

playerRouter.get('/', function showAllPlayers(request, response) {

  Player.find()
    .then(function sendBackAllPlayers(allPlayers) {
      response.json(allPlayers);
    })
    .catch(function handleIssues(err) {
      console.error(err);
      let ourError = new Error('Unable to retrieve players');
      ourError.status = 500;
      next(ourError);
    });
});

module.exports = playerRouter;

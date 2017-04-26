require('../database-setup.js');
const Player = require('../models/Player.model.js');

new Player(
  {
    playerName: 'dsteed',
    playerEmail: 'davidS@dude.com',
    playerScore: 0,
    playerScene: ''
  }).save().then(function done() {
    process.exit();
  });

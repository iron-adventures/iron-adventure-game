require('../database-setup.js');
const Player = require('../models/Player.model.js');

new Player(
  {
    playerName: 'dsteed',
    playerEmail: 'davidS@world.com',
    playerScore: 0,
    playerScene: ''
  }).save().then(function done() {
    process.exit();
  });

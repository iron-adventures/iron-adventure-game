require('../database-setup.js');
const Player = require('../models/Player.model.js');

new Player(
  {
    playerName: '',
    playerEmail: '',
    playerScore: 0,
    playerScene: ''
  }).save().then(function done() {
    process.exit();
  });

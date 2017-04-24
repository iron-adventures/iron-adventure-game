const mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
  playerName: String,
  playerEmail: String,
  playerScore: Number,
  playerScene: String
});

module.exports = mongoose.model('Player', playerSchema);

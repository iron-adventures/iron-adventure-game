const mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
  playerName: String,
  playerEmail: String,
  playerScore: Number,
  currentScene: String
});

module.exports = mongoose.model('Player', playerSchema);

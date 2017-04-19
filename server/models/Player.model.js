const mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
  playerName: String,
  playerEmail: String,
  playerScore: Number
});

module.exports = mongoose.model('Player', playerSchema);

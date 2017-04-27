const mongoose = require('mongoose');

let sceneSchema = mongoose.Schema({
  sceneNext: String,
  sceneImage: String,
  sceneText: String,
  sceneChoices: [
    {
      // choiceId: Number,
      choiceIcon: String,
      choiceText: String,
      choiceScore: Number
    }
  ]
});

module.exports = mongoose.model('Scene', sceneSchema);

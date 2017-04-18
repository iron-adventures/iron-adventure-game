const mongoose = require('mongoose');

let sceneSchema = mongoose.Schema({
  sceneImage: String,
  sceneText: String,
  sceneChoice: {
    choiceText: String,
    choiceScore: Number
  }
});

module.exports = mongoose.model('Scene', sceneSchema);

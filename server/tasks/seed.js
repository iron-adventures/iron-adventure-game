require('../database-setup.js');
const Scene = require('../models/Scene.model.js');
const Player = require('../models/Player.model.js');

new Scene(
  {
    sceneImage: 'images/bedroom-1082262_960_720.jpg',
    sceneText: 'It is the morning of the first day of the coding bootcamp.',
    sceneChoices: [
      {
        choiceIcon: 'glyphicon glyphicon\-flash',
        choiceText: 'Get to the campus early, never been there before.',
        choiceScore: 10
      },
      {
        choiceIcon: 'glyphicon glyphicon\-bed',
        choiceText: 'Sleep in as much as possible, could be a long day.',
        choiceScore: 5
      },
      {
        choiceIcon: 'glyphicon glyphicon\-thumbs\-down',
        choiceText: 'Let\'s keep our same routine, no sweat.',
        choiceScore: 5
      }
    ]
  }).save().then(function done() {
    new Scene(
      {
        sceneImage: 'images/3078856253_aa1e08579c_z.jpg',
        sceneText:
        'You\'ve been stuck on a homework problem for several hours',
        sceneChoices: [
          {
            choiceIcon: 'glyphicon glyphicon\-flash',
            choiceText: 'I own this problem.  Take whatever time is needed.',
            choiceScore: 5
          },
          {
            choiceIcon: 'glyphicon glyphicon\-flash',
            choiceText:
            'Take a break, then work on the problem for a final, set period of time.',
            choiceScore: 5
          },
          {
            choiceIcon: 'glyphicon glyphicon\-flash',
            choiceText:
            'Ask a fellow student or instructor for assistance.  Spend no more time on the problem.',
            choiceScore: 10
          }
        ]
      }
    ).save().then(function done() {
      process.exit();
    });
  });

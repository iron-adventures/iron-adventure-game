require('../database-setup.js');
const Scene = require('../models/Scene.model.js');

new Scene(
  {
    sceneNext: '',
    sceneImage: '/images/bedroom-1082262_960_720.jpg',
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
        sceneNext: '',
        sceneImage: '/images/3078856253_aa1e08579c_z.jpg',
        sceneText:
        'You\'ve been stuck on a homework problem for several hours',
        sceneChoices: [
          {
            choiceIcon: 'glyphicon glyphicon\-thumbs\-up',
            choiceText: 'I own this problem.  Take whatever time is needed.',
            choiceScore: 5
          },
          {
            choiceIcon: 'glyphicon glyphicon\-flash',
            choiceText:
            'Work on the problem for a final, set period of time.',
            choiceScore: 5
          },
          {
            choiceIcon: 'glyphicon glyphicon\-question\-sign',
            choiceText:
            'Ask a fellow student or instructor for assistance.',
            choiceScore: 10
          }
        ]
      }
    ).save().then(function done() {
      new Scene(
        {
          sceneNext: ''
        }
      ).save().then(function done() {
        process.exit();
      });
    });
  });


// process.exit();

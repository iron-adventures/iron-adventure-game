# Iron Adventure

Iron Adventure is a full stack application that hosts interactive short stories for players to experience on their web browser. In each scene, the player evaluates a scenario and makes a choice. At the end of the story, the application displays a summary of the challenges that each scene represented.

The first story included in the application is The Coding Bootcamp, which depicts important themes in preparing for, and succeeding in, an intensive bootcamp for new developers.

## Getting Started

Here is how to get a copy of the project up and running on your local computer. NodeJS, MongoDB are prerequisites for the server side of the application. Check out the project repository, and install the software packages via:

```
npm install
```

NodeJS will need to be configured to connect your database application. We used MongoDB to host our persistent data. You will want to populate your database with scene data as per the schema.

## Automated Testing

The following command will start the Grunt task runner. Grunt will invoke the Karma test runner. Each Karma task will utilize the Mocha test framework to execute tests using the Chai assertion library.

```
grunt karma
```

## Built With

JavaScript, MongoDB, Express, Angular, Node.js, Mongoose, HTML5, CSS3, Sass, Grunt(Karma/Chai/Mocha/Babel)

## Programming Concepts

Responsive Web Design, Single Page Application, Model View Controller (MVC) architecture, Continuous Integration/Continuous Deployment on Heroku, persistent database.

## Authors

Nadia Mughal
[nmughal](https://github.com/nmughal)

David Steed
[davidasteed](https://github.com/davidasteed)

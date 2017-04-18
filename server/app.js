const express = require('express');
const bodyParser = require('body-parser');

require('./database-setup.js');

let app = express();

console.log('Database location', process.env.MY_DB_LOCATION);

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());

app.get('/', function showHomePage(request, response, next) {
  console.log(request.url);

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.end('<h1>Hello World</h1>');
});

app.listen(3000, function doSomethingServer() {
  console.log('The server is now up');
});

const express = require('express');
const bodyParser = require('body-parser');

require('./database-setup.js');

let app = express();

console.log('Database location', process.env.MY_DB_LOCATION);

app.use(express.static(__dirname + '/../client/src'));

app.use(bodyParser.json());

app.use('/api/players', require('./routes/player.routes.js'));

app.listen(3000, function doSomethingServer() {
  console.log('The server is now up');
});

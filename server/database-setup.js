const mongoose = require('mongoose');

if (!process.env.MY_DB_LOCATION) {
  console.log('No database detected');
  process.exit();
}

mongoose.connect(process.env.MY_DB_LOCATION);

mongoose.connection.on('error', function handleDBErrors(err) {
  console.log('DB Error', err);
  process.exit();
});

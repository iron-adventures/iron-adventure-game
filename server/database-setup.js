const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.log('No database detected');
  process.exit();
}

console.log('Database location', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', function handleDBErrors(err) {
  console.log('DB Error', err);
  process.exit();
});

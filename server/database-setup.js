const mongoose = require('mongoose');

if (!process.env.IRON_ADVENTURE_MONGO_DB_URL) {
  console.log('No database detected');
  process.exit();
}

console.log('Database location', process.env.IRON_ADVENTURE_MONGO_DB_URL);
mongoose.connect(process.env.IRON_ADVENTURE_MONGO_DB_URL);

mongoose.connection.on('error', function handleDBErrors(err) {
  console.log('DB Error', err);
  process.exit();
});

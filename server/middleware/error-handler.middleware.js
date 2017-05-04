module.exports = function errorHandler( err, req, res, next ) {
  console.error('Whoops', err.message);
  res.status(err.status || 500);
  res.json({ message: err.message, time: Date.now() });
};

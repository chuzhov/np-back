// signalHandler.js

const { pool } = require('./db/dbUtils'); // Import the pool from dbUtils.js

function handleSigterm(server) {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received.');
    console.log('Closing server...');

    // Close the server
    server.close(() => {
      console.log('Server closed.');

      // Check if the pool is defined before attempting to close it
      if (pool && typeof pool.end === 'function') {
        pool
          .end()
          .then(() => {
            console.log('Database connection pool closed.');
            process.exit(0); // Terminate the process gracefully
          })
          .catch(error => {
            console.error('Error closing database connection pool:', error);
            process.exit(1); // Terminate the process with an error
          });
      } else {
        console.log(
          'Database connection pool not initialized or does not have "end" method.'
        );
        process.exit(0); // Terminate the process gracefully
      }
    });
  });
}

module.exports = { handleSigterm };

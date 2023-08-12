const app = require('./app');
const { handleSigterm } = require('./signalHandler');

const { PORT = 4000 } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle SIGTERM signal
handleSigterm(server);
module.exports = server;

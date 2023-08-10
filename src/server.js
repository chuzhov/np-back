const app = require('./app');

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

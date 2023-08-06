const app = require('./app');

const { PORT = 4000 } = process.env;

const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
});
app.locals.pool = pool;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

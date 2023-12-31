const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');

const packagesRouter = require('./routes/');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});
app.use('/api/1.0/packages', packagesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;

const dotenv = require('dotenv');
dotenv.config().parsed;
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('./config/winston');
const db = require('./config/database');
require('./config/passport');

// DB
mongoose
  .connect(
    db.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => logger.log({ level: 'info', message: "MongoDB connected" }))
  .catch(err => logger.log({ level: 'error', message: JSON.stringify(err) }));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/api/accidents', require('./routes/accidents'));
app.use('/api/users', require('./routes/users'));

// Server redirect to client
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, logger.log({ level: 'info', message: `Server started on port ${PORT}` }));

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

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('dist'));

// Passport middleware
server.use(passport.initialize());

// Routes
server.use('/api/accidents', require('./routes/accidents'));
server.use('/api/users', require('./routes/users'));

// Server redirect to client
server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, logger.log({ level: 'info', message: `Server started on port ${PORT}` }));
module.exports = server;
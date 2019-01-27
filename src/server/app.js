const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/database');
const path = require('path');
const passport = require('passport');
require('./config/passport');
const bodyParser = require('body-parser');

// DB
mongoose
  .connect(
    db.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

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
app.listen(PORT, console.log(`Server started on port ${PORT}`));

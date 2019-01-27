const express = require('express');
const router = express.Router();
const passport = require('passport');
const { secret } = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const EXPIRESIN = '24h'

// Register
router.post('/register', (req, res, next) => {
  const { username, password, email, password2 } = req.body;
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.status(403).send(info.message);
    } else {
      req.logIn(user, err => {
        User.findOne({ username: username })
        .then(user => {
          user
            .updateOne({
              username: username,
              email: email,
            })
            .then(() => {
              console.log('user created in db');
              res.status(200).send({ message: 'user created' });
            });
        });
      });
    }
  })(req, res, next);
});

// Login
router.post('/login', (req, res, next) => {
  const { username } = req.body;
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log('error');
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      if (info.message === 'bad username') {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(user, err => {
        User.findOne({ username: username }).then(user => {
          const token = jwt.sign({ username: user.username }, secret, { expiresIn: EXPIRESIN });
          res.status(200).send({
            auth: true,
            token: token,
            message: 'user found & logged in',
          });
        });
      });
    }
  })(req, res, next);
});

module.exports = router;
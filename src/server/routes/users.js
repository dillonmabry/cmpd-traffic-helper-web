const express = require('express');
const router = express.Router();
const passport = require('passport');
const { secret, token_expire } = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/winston');

// Register
router.post('/register', (req, res, next) => {
  const { username, password, email, password2 } = req.body;
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      logger.log({ level: 'error', message: JSON.stringify(err) })
    }
    if (info != undefined) {
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
      logger.log({ level: 'error', message: JSON.stringify(err) })
    }
    if (info != undefined) {
      if (info.message === 'bad username') {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(user, err => {
        User.findOne({ username: username }).then(user => {
          const token = jwt.sign({ username: user.username }, secret, { expiresIn: token_expire });
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
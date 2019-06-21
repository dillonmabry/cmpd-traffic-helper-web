const bcrypt = require('bcryptjs');
const { secret } = require('./jwtConfig');
const BCRYPT_SALT_ROUNDS = 12;
const logger = require('../config/winston');

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('../models/User'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      try {
        User.findOne({ username: username })
        .then(user => {
          if (user != null) {
            return done(null, false, {
              message: 'username or email already taken',
            });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              User.create({
                username: username,
                password: hashedPassword,
                email: req.body.email,
              }).then(user => {
                logger.log({ level: 'info', message: `user created: ${username}` })
                return done(null, user);
              });
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({ username: username })
        .then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                return done(null, false, { message: 'passwords do not match' });
              }
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};
passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({ username: jwt_payload.username })
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
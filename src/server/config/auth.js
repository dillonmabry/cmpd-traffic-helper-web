const passport = require('passport');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
      if (info != undefined) {
        if (info.message === 'bad username') {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      }
      if (user) {
        next()
      } else {
        res.status(401).send
      }
    })(req, res, next)
  }
}
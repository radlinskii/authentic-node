/* eslint-disable no-console */
import {Strategy as LocalStrategy,} from 'passport-local';
import User from '../models/user.model';

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    User.findOne({username: username,}, (err, user) => {
      if (err) return done(err);
      else if (!user) return done(null, false);
      else {
        if (!user.validPassword(password))
          return done(null, false);
        return done(null, user);
      }
    });
  }));
};

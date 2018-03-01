/* eslint-disable no-console */
import passport from 'passport';
import {Strategy as LocalStrategy,} from 'passport-local';
import User from '../models/user.model';
import * as bcrypt from 'bcrypt';

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    User.findOne({username: username,}, (error, user) => {
      if (error) return done(error);
      else if (!user) return done(null, false);
      else {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) return done(null, user);
          else return done(null, false);
        });
      }
    });
  }));
};

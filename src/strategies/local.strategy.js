import { Strategy as LocalStrategy, } from 'passport-local';
import User from '../models/user.model';
import mongoose from 'mongoose';

module.exports = (passport) => {

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    User.findOne({ username: username, }, (err, user) => {
      if (err) return done(err, false, { message: 'Error logging in.', });
      else if (!user) return done(null, false, { message: 'Incorrect username or password.', });
      else {
        if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password or username.', });
        return done(null, user);
      }
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true,
  },
  (req, username, password, done) => {
    if(req.body.password === req.body.repeatedPassword) {
      User.findOne({ username: req.body.username, }, (err, result) => {
        if (err) { return done(err, false, { message: 'Error registering.', }); }
        if(!result) {
          let user;
          if(!req.user) {
            user = new User();
            user._id = new mongoose.Types.ObjectId();
          } else user = req.user;
          user.username = username;
          user.password = user.generateHash(password);
          user.save(err => {
            if (err) return done(err, false, { message: 'database error', });
            return done(null, user);
          });
        } else return done(null, false, { message: 'Username already in use.', });
      });
    } else {
      return done(null, false, { message: 'Passwords mismatch.', });
    }
  }
  ));
};


import { Strategy as LocalStrategy, } from 'passport-local';
import User from '../models/user';
import mongoose from 'mongoose';
import validator from 'validator';

module.exports = (passport) => {

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'loginUsername',
    passwordField: 'loginPassword',
  },
  (username, password, done) => {
    User.findOne({ $or: [{ username: username, }, { email: username, },], }, (err, result) => {
      if (err) return done(err, false, { message: 'Error logging in.', });
      if (!result) return done(null, false, { message: 'Incorrect username or password.', });
      else {
        if (!result.validPassword(password)) return done(null, false, { message: 'Incorrect password or username.', });
        return done(null, result);
      }
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    User.findOne({ $or: [{ username: username, }, { email: req.body.email, },], }, (err, result) => {
      if (err) return done(err, false, { message: 'Error registering!', });
      if (!validator.isEmail(req.body.email)) return done(err, false, { message: 'Invalid Email Address!', });
      if (result) {
        return done(null, false, { message: 'Username or Email already in use.', });
      } else {
        const user = new User();
        user._id = new mongoose.Types.ObjectId();
        user.email = req.body.email;
        user.username = username;
        user.password = user.generateHash(password);
        user.save(err => {
          if (err) return done(err, false, { message: 'Error registering!', });
          return done(null, user);
        });
      }
    });
  }
  ));

  passport.use('local-connect', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    User.findOne({ username: username, }, (err, result) => {
      if (err) return done(err, false, { message: 'Error registering.', });
      if (result) {
        return done(null, false, { message: 'Username already in use.', });
      } else {
        const user = req.user;
        user.username = username;
        user.password = user.generateHash(password);
        user.save(err => {
          if (err) return done(err, false, { message: 'Error registering.', });
          return done(null, user);
        });
      }
    });
  }
  ));
};


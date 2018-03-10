import { Strategy as LocalStrategy, } from 'passport-local';
import User from '../models/user';
import mongoose from 'mongoose';

module.exports = (passport) => {

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'loginUsername',
    passwordField: 'loginPassword',
  },
  (username, password, done) => {
    User.findOne({ username: username, })
      .then(user => {
        if (!user) return done(null, false, { message: 'Incorrect username or password.', });
        else {
          if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password or username.', });
          return done(null, user);
        }
      })
      .catch(err => done(err, false, { message: 'Error logging in.', }));
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true,
  },
  (req, username, password, done) => {
    User.findOne({ username: username, })
      .then(result => {
        if(!result) {
          let user;
          if(!req.user) {
            user = new User();
            user._id = new mongoose.Types.ObjectId();
          } else user = req.user;
          user.username = username;
          user.password = user.generateHash(password);
          user.save(() => {
            return done(null, user);
          });
        } else return done(null, false, { message: 'Username already in use.', });
      })
      .catch(err => done(err, false, { message: 'Error registering.', }));
  }
  ));
};


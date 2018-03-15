import { Strategy as GithubStrategy, } from 'passport-github';
import mongoose from 'mongoose';
import User from '../models/User';

module.exports = (passport) => {
  passport.use('github', new GithubStrategy({
    clientID: process.env.githubClientID,
    clientSecret: process.env.githubClientSecret,
    callbackURL: process.env.githubCalbbackURL,
    scope: 'user:email',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    if (!req.user) {
      User.findOne({ githubID: profile.id, }, (err, result) => {
        if (err) return done(err, false, { message: 'Database error.', });
        if (result) return done(null, result);
        else {
          User.find({ email: profile.emails[0].value, }, (err, results) => {
            if (results.length) {
              return done(null, false, { message: 'Your github email is already used', });
            } else {
              const user = new User();
              user._id = new mongoose.Types.ObjectId();
              user.githubID = profile.id;
              user.githubName = profile.displayName;
              user.email = profile.emails[0].value;
              user.save(err => {
                if (err) return done(err, false, { message: 'Database error.', });
                return done(null, user);
              });
            }
          });
        }
      });
    } else {
      User.findOne({ githubID: profile.id, }, (err, result) => {
        if (err) return done(err, false, { message: 'Database error.', });
        if (result) return done(null, false, { message: 'Can\'t link github account to multiple local accounts.', });
        else {
          const user = req.user;
          user.githubID = profile.id;
          user.githubName = profile.displayName;
          user.save(err => {
            if (err) return done(err, false, { message: 'Database error.', });
            return done(null, user);
          });
        }
      });
    }
  }));
};

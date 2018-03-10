import { Strategy as GithubStrategy, } from 'passport-github';
import mongoose from 'mongoose';
import User from '../models/user';

module.exports = (passport) => {
  passport.use('github', new GithubStrategy({
    clientID: process.env.githubClientID,
    clientSecret: process.env.githubClientSecret,
    callbackURL: process.env.githubCalbbackURL,
    passReqToCallback : true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    if(!req.user) {
      User.findOne({ githubID: profile.id, })
        .then(result => {
          if (result) return done(null, result);
          else {
            const user = new User();
            user._id = new mongoose.Types.ObjectId();
            user.githubID = profile.id;
            user.githubName = profile.displayName;
            user.githubEmail = profile.emails[0].value;
            user.save(() => done(null, user));
          }
        })
        .catch(err => done(err, false, { message: 'Database error.', }));
    } else {
      User.findOne({ githubID: profile.id, })
        .then(result => {
          if (result) return done(null, false, { message: 'Can\'t link github account to multiple local accounts.', });
          else {
            const user = req.user;
            user.githubID = profile.id;
            user.githubName = profile.displayName;
            user.githubEmail = profile.emails[0].value;
            user.save(() => done(null, user));
          }
        })
        .catch(err => done(err, false, { message: 'Database error.', }));
    }
  }));
};

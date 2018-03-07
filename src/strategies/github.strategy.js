import { Strategy as GithubStrategy, } from 'passport-github';
import mongoose from 'mongoose';
import User from '../models/user.model';

module.exports = (passport) => {
  passport.use(new GithubStrategy({
    clientID: '8dfd0a616bbb2d952ac3',
    clientSecret: '4d73266279806735692b28856e367610f536c3ee',
    callbackURL: 'https://authentic-node.herokuapp.com/auth/github/callback', //'http://localhost:8080/auth/github/callback', //
    passReqToCallback : true,
  },
  function (req, accessToken, refreshToken, profile, done) {
    if (!req.user) {
      User.findOne({ githubID: profile.id, }, (err, result) => {
        if (err) return done(err, false, { message: 'Database error.', });
        if (result) return done(null, result);
        else {
          let user = new User();
          user._id = new mongoose.Types.ObjectId();
          user.githubID = profile.id;
          user.githubName = profile.displayName;
          user.githubEmail = profile.emails[0].value;
          user.save(err => {
            if (err) return done(err, false, { message: 'Database error.', });
            return done(null, user);
          });
        }
      });
    } else {
      User.findOne({ githubID: profile.id, }, (err, result) => {
        if (err) return done(err, false, { message: 'Database error.', });
        if (result) return done(null, false, { message: 'Can\'t link github account to multiple local accounts.', });
        else {
          let user = req.user;
          user.githubID = profile.id;
          user.githubName = profile.displayName;
          user.githubEmail = profile.emails[0].value;
          user.save((err) => {
            if (err) return done(err, false, { message: 'Database error.', });
            return done(null, user);
          });
        }
      });
    }
  }
  ));
};

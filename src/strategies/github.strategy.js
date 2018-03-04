/* eslint-disable no-console */
import {Strategy as GithubStrategy,} from 'passport-github';
import mongoose from 'mongoose';
import User from '../models/user.model';

module.exports = (passport) => {
  passport.use(new GithubStrategy({
    clientID: '8dfd0a616bbb2d952ac3',
    clientSecret: '4d73266279806735692b28856e367610f536c3ee',
    callbackURL: 'https://authentic-node.herokuapp.com/auth/github/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({username: profile.username,}, (err, result) => {
      if (err) return done(err);
      if (result) return done(null, result);
      else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username : profile.username,
        });
        user.save(err => {
          if(err) return done(err);
          return done(null, user);
        });
      }
    });
  }
  ));
};

/* eslint-disable no-console */
import passport from 'passport';
import {Strategy as FacebookStrategy,} from 'passport-facebook';

module.exports =  () => {
  passport.use(new FacebookStrategy({
    clientID: '174215129885929',
    clientSecret: 'abfa99ebbd86be92e83aae6dec981489',
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    console.log('ff');
  }));
};



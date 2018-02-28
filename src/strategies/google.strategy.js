/* eslint-disable no-console */
import {Strategy as GoogleStrategy,} from 'passport-google-oauth20';
import passport from 'passport';

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: '994820627587-i4838igjpupf0r9l85mv95skitpn50u7.apps.googleusercontent.com',
    clientSecret: 'FXWkG5oup0qO0vh2YN6pTgRA',
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
  (req, accessToken, refreshToken, profile, done) => {
    console.info('gg');
  }));
};

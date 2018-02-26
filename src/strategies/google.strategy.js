/* eslint-disable no-console */
import {Strategy as GoogleStrategy,} from 'passport-google-oauth20';
import passport from 'passport';
import config from '../config';
import {Client,} from 'pg/lib/index';

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: '994820627587-i4838igjpupf0r9l85mv95skitpn50u7.apps.googleusercontent.com',
    clientSecret: 'FXWkG5oup0qO0vh2YN6pTgRA',
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
  function (req, accessToken, refreshToken, profile, done) {
    let user = {};

    const client = new Client(config.conString);
    client.connect()
      .then(() => {
        const sql = 'SELECT * FROM users WHERE googleId = ($1);';
        const params = [profile.id,];
        return client.query(sql, params);
      })
      .then((results) => {
        if (results.rows.length < 1) {
          console.log('not-found by google.id');
          const sql = 'INSERT INTO users (name, googleId) VALUES ($1, $2);';
          const params = [profile.displayName, profile.id,];
          return client.query(sql, params);
        } else {
          console.log('found by google.id');
        }
      }).then(() => {
        user.name = profile.displayName;

        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;

        done(null, user);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  ));
};

/* eslint-disable no-console */
import {Client,} from 'pg/lib/index';
import passport from 'passport';
import {Strategy as FacebookStrategy,} from 'passport-facebook';
import config from '../config';

module.exports = function () {
  passport.use(new FacebookStrategy({
    clientID: '174215129885929',
    clientSecret: 'abfa99ebbd86be92e83aae6dec981489',
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    passReqToCallback: true,
  },
  function (req, accessToken, refreshToken, profile, done) {
    let user = {};

    const client = new Client(config.conString);
    client.connect()
      .then(() => {
        const sql = 'SELECT * FROM users WHERE facebookId = ($1);';
        const params = [profile.id,];
        return client.query(sql, params);
      })
      .then((results) => {
        if (results.rows.length < 1) {
          console.log('not-found by facebook.id');
          const sql = 'INSERT INTO users (name, facebookId) VALUES ($1, $2);';
          const params = [profile.displayName, profile.id,];
          return client.query(sql, params);
        } else {
          console.log('found by facebook.id');
        }
      }).then(() => {
        user.name = profile.displayName;

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;

        done(null, user);
      })
      .catch((err) => {
        console.log(err);
      });
  }));
};



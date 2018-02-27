/* eslint-disable no-console */
import passport from 'passport';
import {Strategy as LocalStrategy,} from 'passport-local';
import {MongoClient as mongodb,} from 'mongodb';
import * as bcrypt from 'bcrypt';

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    const url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';// 'mongodb://@localhost:27017/authentic-db;';

    mongodb.connect(url, (err, db) => {
      if(err) console.log('strategy local' + err);
      const dbo = db.db('authentic-db');
      dbo.collection('users').findOne({username: username,}, (error, user) => {
        if (error) { return done(error); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, function(err, res) {
          if(res === true) return done(null, user);
          else return done(null, false);
        });
      });
    });
  }));
};

/* eslint-disable no-console */
import {MongoClient as mongodb,} from 'mongodb';
import passport from 'passport/lib/index';

const authController = () => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postUser = (req, res) => {
    if(req.body.password === req.body.repeatedPassword) {
      let url = 'mongodb://@localhost:27017/authentic-db;'; //'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';
      mongodb.connect(url, (err, db) => {
        if (err) console.log('/signup' + err);
        const dbo = db.db('authentic-db');
        const user = {
          username: req.body.username,
          password: req.body.password,
        };
        dbo.collection('users').insertOne(user, (err, results) => {
          if (err) throw err;
          req.login(results.ops[0], () => {
            res.redirect('/');
          });
          db.close();
        });
      });
    } else {
      res.redirect('/?passwords=mismatch');
    }
  };

  const postProfile = (req, res) => passport.authenticate('local',
    { successRedirect: '/', failureRedirect: '/', })(req, res);

  const getProfile = (req, res) => {
    res.json(req.user);
  };

  const logout = (req, res) => {
    req.logout();
    res.redirect('/');
  };

  return {
    postUser: postUser,
    postProfile: postProfile,
    middleware: middleware,
    getProfile: getProfile,
    logout: logout,
  };
};

module.exports = authController;

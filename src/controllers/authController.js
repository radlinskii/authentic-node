/* eslint-disable no-console */
import {MongoClient as mongodb,} from 'mongodb';
import passport from 'passport/lib/index';
import * as bcrypt from 'bcrypt';

const authController = () => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postRegister = (req, res) => {
    if(req.body.password === req.body.repeatedPassword) {
      let url ='mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db'; //'mongodb://@localhost:27017/authentic-db;';
      mongodb.connect(url, (err, db) => {
        if (err) console.log('/signup' + err);
        const dbo = db.db('authentic-db');

        bcrypt.hash(req.body.password, 10).then(function(hash) {
          let user = {
            username: req.body.username,
            password: hash,
          };
          dbo.collection('users').insertOne(user, (err, results) => {
            if (err) throw err;
            req.login(results.ops[0], () => {
              res.redirect('/');
            });
            db.close();
          });
        });
      });
    } else {
      res.redirect('/?passwords=mismatch');
    }
  };

  const postLogin = (req, res) => passport.authenticate('local',
    { successRedirect: '/', failureRedirect: '/?error=wrong%20credentials', })(req, res);

  const getProfile = (req, res) => {
    res.json(req.user);
  };

  const logout = (req, res) => {
    req.logout();
    res.redirect('/');
  };

  return {
    postRegister: postRegister,
    postLogin: postLogin,
    middleware: middleware,
    getProfile: getProfile,
    logout: logout,
  };
};

module.exports = authController;

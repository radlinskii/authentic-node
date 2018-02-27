/* eslint-disable no-console */
import {MongoClient as mongodb, ObjectID as ObjectId,} from 'mongodb';
import passport from 'passport/lib/index';

const authController = (todoService) => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postUser = (req, res) => {
    let url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';
    mongodb.connect(url, (err, db) => {
      if(err) console.log('/signup' + err);
      const dbo = db.db('authentic-db');
      const user = {
        username: req.body.username,
        password: req.body.password,
      };
      dbo.collection('users').insertOne(user, (err, results) => {
        if(err) throw err;
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
        db.close();
      });
    });
  };

  const postProfile = (req, res) => passport.authenticate('local',
    { successRedirect: '/auth/profile', failureRedirect: '/', })(req, res);

  const getProfile = (req, res) => {
    res.json(req.user);
  };



  return {
    postUser: postUser,
    postProfile: postProfile,
    middleware: middleware,
    getProfile: getProfile,
  };
};

module.exports = authController;

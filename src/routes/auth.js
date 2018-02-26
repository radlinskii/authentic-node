import express from 'express';
import passport from 'passport';
import {MongoClient as mongodb,} from 'mongodb';

const router = express.Router();

router.route('/signup')
  .post((req, res) => {
    console.log(req.body);
    const url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';

    mongodb.connect(url, (err, db) => {
      if(err) console.log(err);
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

  });

router.route('/profile')
  .get((req, res) => {
    res.json(req.user);
  });

router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/profile', //changeme
    failure: '/error/',
  }));

router.route('/google')
  .get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',],
  }));

router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['email',],
  }));
router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/user/get',
    failureRedirect: '/error',
  }));

module.exports = router;

import express from 'express';
import passport from 'passport';
import {MongoClient as mongodb,} from 'mongodb';

const router = express.Router();

router.route('/signup')
  .post((req, res) => {
    console.log(req.body);
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

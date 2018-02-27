/* eslint-disable no-console */
import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/signup')
  .post(authController(null).postUser);

router.route('/signin')
  .post(authController(null).postProfile);

router.route('/profile')
  .all(authController(null).middleware)
  .get(authController(null).getProfile);

router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/profile',
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

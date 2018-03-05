/* eslint-disable no-console */
import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/signup')
  .post(authController.postRegister);

router.route('/signin')
  .post(authController.postLogin);

router.route('/logout')
  .get(authController.logout);

router.route('/github/callback')
  .get(passport.authenticate('github', { failureRedirect: `/?error=${encodeURI('error authenticating with github')}`, }),
    (req, res) => {
      res.redirect('/');
    });

router.route('/github')
  .get(passport.authenticate('github'));

module.exports = router;

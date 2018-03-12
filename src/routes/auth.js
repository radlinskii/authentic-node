import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/signup')
  .post(authController.postRegister);

router.route('/signin')
  .post(authController.postLogin);

router.route('/logout')
  .get(authController.logout);

router.route('/unlink/github')
  .post(authController.unlinkGithub);

router.route('/github')
  .get(authController.githubAuthenticate);

router.route('/github/callback')
  .get(authController.githubAuthenticateCB);

router.route('/github/connect')
  .get(authController.githubAuthorize);

router.route('/github/connect/callback')
  .get(authController.githubAuthorizeCB);

module.exports = router;

import express from 'express';
import profileController from '../controllers/profileController';

const profileRouter = express.Router();

profileRouter.use(profileController.middleware);

profileRouter.route('')
  .get(profileController.getProfile);

profileRouter.route('/delete')
  .post(profileController.postDelete);

profileRouter.route('/deletegithub')
  .post(profileController.postDeleteGithub);

profileRouter.route('/changepassword')
  .post(profileController.postChangePassword);

profileRouter.route('/connect')
  .post(profileController.postConnect);


module.exports = profileRouter;

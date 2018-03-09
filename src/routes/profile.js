import express from 'express';
import profileController from '../controllers/profileController';

const profileRouter = express.Router();

profileRouter.use(profileController.middleware);

profileRouter.route('')
  .get(profileController.getProfile);

profileRouter.route('/delete')
  .post(profileController.postDelete);

module.exports = profileRouter;

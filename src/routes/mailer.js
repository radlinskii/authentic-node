import express from 'express';
import mailerController from '../controllers/mailerController';

const mailerRouter = express.Router();

mailerRouter.route('/send')
  .post(mailerController.send);

mailerRouter.route('/reset')
  .post(mailerController.reset);


module.exports = mailerRouter;

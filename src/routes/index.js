import express from 'express';
import indexController from '../controllers/indexController';

const indexRouter = express.Router();

indexRouter.route('')
  .get(indexController.getIndex);

module.exports = indexRouter;

/* eslint-disable no-console */
import express from 'express';
import todoController from '../controllers/todoController';

const todoRouter = express.Router();

todoRouter.use(todoController(null).middleware);

todoRouter.route('/')
  .get(todoController(null).getIndex);

todoRouter.route('/:id')
  .get(todoController(null).getById);

module.exports = todoRouter;

/* eslint-disable no-console */
import express from 'express';
import todoController from '../controllers/todoController';

const todoRouter = express.Router();

todoRouter.use(todoController.middleware);

todoRouter.route('/')
  .get(todoController.getIndex);

todoRouter.route('/:id')
  .get(todoController.getById);

todoRouter.route('/add')
  .post(todoController.postTodo);

module.exports = todoRouter;

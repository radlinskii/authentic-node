import express from 'express';

const todoRouter = express.Router();

let todos = [
  {
    title: 'learn how to manage time',
    author: 'ignac',
  },
  {
    title: 'CRACKING THE CODING INTERVIEW',
    author: 'aga',
  },
];

todoRouter.route('/')
  .get((req, res) => {
    res.render('todos', {title: 'todos', todos: todos,});
  });

todoRouter.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    res.render('todo',{title: todos[id].title, todo: todos[id],});
  });

module.exports = todoRouter;

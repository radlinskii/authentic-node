/* eslint-disable no-console */
import mongoose from 'mongoose';
import Todo from '../models/todo.model';

const todoController = () => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const getTodos = (req, res) => {
    Todo.find({author: req.user._id,}, (err, results) => {
      if(err) res.redirect(`/?error=${encodeURI('error loading todo list')}`);
      res.render('todos', {title: 'To Do List', todos: results, isLoggedIn: req.isAuthenticated(),});
    });
  };

  const getTodoById = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Todo.findOne({_id: id,}, (err, result) => {
      if(err) res.redirect(`/todos?error=${encodeURI('error loading todo')}`);
      else if(!result) res.redirect(`/todos?error=${encodeURI('no such to do')}`);
      else if(result.author.toString() === req.user._id) res.render('todo', {title: 'single todo', todo: result, isLoggedIn: req.isAuthenticated(),});
      else res.redirect(`/todos?error=${encodeURI('permission denied')}`);
    });
  };

  const postTodo = (req, res) => {
    const todo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      author: req.user._id,
      authorUsername: req.user.username,
      content: req.body.todoInput,
    });
    todo.save(err => {
      if (err) res.redirect(`/todos?error=${encodeURI('error saving todo to db')}`);
      res.redirect('/todos');
    });
  };

  return {
    getTodos: getTodos,
    getTodoById: getTodoById,
    middleware: middleware,
    postTodo: postTodo,
  };
};

module.exports = todoController();

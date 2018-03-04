/* eslint-disable no-console */
import mongoose from 'mongoose';
import Todo from '../models/todo.model';

const todoController = () => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const getTodos = (req, res) => {
    Todo.find({author: req.user.id,}, (err, results) => {
      if(err) res.redirect(`/?error=${encodeURI('error loading todo list')}`);
      res.render('todos', {title: 'To Do List', todos: results, isLoggedIn: req.isAuthenticated(),});
    });
  };

  const getTodoById = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Todo.findOne({_id: id,}, (err, result) => {
      if(err) res.redirect(`/todos?error=${encodeURI('error loading todo')}`);
      else if(!result) res.redirect(`/todos?error=${encodeURI('no such to do')}`);
      else if(result.author.toString() === req.user.id) res.render('todo', {title: 'single todo', todo: result, isLoggedIn: req.isAuthenticated(),});
      else res.redirect(`/todos?error=${encodeURI('permission denied')}`);
    });
  };

  const addZeros = (numStr) => {
    return parseInt(numStr) < 10 ? '0' + numStr : numStr;
  };
  const getMyDate = () => {
    const d = new Date();
    return `${addZeros(d.getDate())}.${addZeros(d.getMonth())}.${addZeros(d.getFullYear())} ${addZeros(d.getHours())}:${addZeros(d.getMinutes())}:${addZeros(d.getSeconds())}`;
  };

  const postTodo = (req, res) => {
    const todo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      author: req.user._id,
      authorUsername: req.user.username,
      content: req.body.todoInput,
      date: getMyDate(),
    });
    todo.save(err => {
      if (err) res.redirect(`/todos?error=${encodeURI('error saving todo to db')}`);
      res.redirect('/todos');
    });
  };

  const deleteTodoById = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err) => {
      if (err) res.redirect(`/todos?error=${encodeURI('error deleting todo from database')}`);
      res.redirect('/todos');
    });
  };

  const editTodoById = (req, res) => {
    const todo = new Todo({
      content: req.body.editInput,
      date: getMyDate(),
    });
    Todo.findByIdAndUpdate(req.params.id, todo,(err) => {
      if (err) res.redirect(`/todos?error=${encodeURI('error deleting todo from database')}`);
      res.redirect(`/todos/${req.params.id}`);
    });
  };

  return {
    getTodos: getTodos,
    getTodoById: getTodoById,
    middleware: middleware,
    postTodo: postTodo,
    deleteTodoById: deleteTodoById,
    editTodoById: editTodoById,
  };
};

module.exports = todoController();

import mongoose from 'mongoose';
import Todo from '../models/todo.model';

const todoController = () => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) {
      req.flash('error', 'Permission denied!');
      res.redirect('/todos');
    }
    else next();
  };

  const getTodos = (req, res) => {
    Todo.find({ author: req.user.id, }, (err, results) => {
      if(err) {
        req.flash('error', 'Error Loading To Do List!');
        res.redirect('/');
      }
      res.render('todos', { title: 'To Do List', todos: results, isLoggedIn: req.isAuthenticated(), });
    });
  };

  const getTodoById = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Todo.findOne({ _id: id, }, (err, result) => {
      if(err) {
        req.flash('error', 'error loading To Do!');
        res.redirect('/todos');
      }
      else if(!result) {
        req.flash('error', 'No such To Do!');
        res.redirect('/todos');
      }
      else if(result.author.toString() === req.user.id) res.render('todo', { title: 'single todo', todo: result, isLoggedIn: req.isAuthenticated(), });
      else {
        req.flash('error', 'Permission Denied!');
        res.redirect('/todos');
      }
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
      if (err) {
        req.flash('error', 'Error saving To Do to Database!');
        res.redirect('/todos');
      }
      res.redirect('/todos');
    });
  };

  const deleteTodoById = (req, res) => {

    Todo.findById(req.params.id, (err, todo) => {
      if (err) {
        req.flash('error', 'Error deleting To Do from Database!');
        res.redirect('/todos/');
      }
      if(todo.author === req.user.id) {
        todo.remove((err) => {
          if(err) {
            req.flash('error', 'Error deleting To Do from Database!');
            res.redirect('/todos');
          } else res.redirect('/todos');
        });
      } else {
        req.flash('error', 'Permission Denied!');
        res.redirect('/todos');
      }
    });
  };

  const editTodoById = (req, res) => {
    const todo = new Todo({
      content: req.body.editInput,
      date: getMyDate(),
    });
    Todo.findByIdAndUpdate(req.params.id, todo,(err) => {
      if (err) {
        req.flash('error', 'Error editing To Do!');
        res.redirect('/todos');
      }
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

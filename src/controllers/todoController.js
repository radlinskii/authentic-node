/* eslint-disable no-console */
import {MongoClient as mongodb, ObjectID as ObjectId,} from 'mongodb';

const todoController = () => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const getIndex = (req, res) => {
    let url ='mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';// 'mongodb://@localhost:27017/authentic-db;';
    mongodb.connect(url, (err, db) => {
      if (err) console.log('todos/' + err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').find({author: req.user.username,}).toArray((err, results) => {
        res.render('todos', {title: 'todos', todos: results, isLoggedIn: req.isAuthenticated(),});
      });
    });
  };

  const getById = (req, res) => {
    const id = new ObjectId(req.params.id);
    let url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';// 'mongodb://@localhost:27017/authentic-db;';
    mongodb.connect(url, (err, db) => {
      if (err) console.log(err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').findOne({_id: id,}, (err, results) => {
        res.render('todo', {title: 'single todo', todo: results, isLoggedIn: req.isAuthenticated(),});
      });
    });
  };

  const addZeros = (int) => parseInt(int) < 10 ? '0' + int : int;

  const postTodo = (req, res) => {
    let d = new Date();
    let dates = addZeros(d.getHours()) + ':' + addZeros(d.getMinutes()) + ' ' + addZeros(d.getDate())  + '.' + addZeros(d.getMonth()) + '.'+ d.getFullYear();
    let todo = {
      author: req.user.username,
      content: req.body.todoInput,
      date: dates,
    };
    const url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';
    mongodb.connect(url, (err, db) => {
      if(err) console.log(err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').insertOne(todo, (err, results) => { //eslint-disable-line
        if(err) throw err;
        res.redirect('/todos');
        db.close();
      });
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    middleware: middleware,
    postTodo: postTodo,
  };
};

module.exports = todoController;

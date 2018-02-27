/* eslint-disable no-console */
import {MongoClient as mongodb, ObjectID as ObjectId,} from 'mongodb';

const todoController = (todoService) => {
  const middleware = (req, res, next) => {
    if(!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const getIndex = (req, res) => {
    let url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';
    mongodb.connect(url, (err, db) => {
      if (err) console.log('todos/' + err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').find().toArray((err, results) => {
        res.render('todos', {title: 'todos', todos: results, isLoggedIn: req.isAuthenticated(),});
      });
    });
  };

  const getById = (req, res) => {
    const id = new ObjectId(req.params.id);
    let url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';
    mongodb.connect(url, (err, db) => {
      if (err) console.log(err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').findOne({_id: id,}, (err, results) => {
        res.render('todo', {title: 'single todo', todo: results, isLoggedIn: req.isAuthenticated(),});
      });
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    middleware: middleware,
  };
};

module.exports = todoController;

/* eslint-disable no-console */
import express from 'express';
import {MongoClient as mongodb,} from 'mongodb';
import {ObjectID as ObjectId,} from 'mongodb';

const todoRouter = express.Router();

todoRouter.use((req, res, next) => {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
});

todoRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';

    mongodb.connect(url, (err, db) => {
      if (err) console.log('todos/' + err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').find().toArray((err, results) => {
        res.render('todos', {title: 'todos', todos: results,});
      });
    });
  });

todoRouter.route('/:id')
  .get((req, res) => {
    const id = new ObjectId(req.params.id);
    const url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';
    mongodb.connect(url, (err, db) => {
      if (err) console.log(err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').findOne({_id: id,}, (err, results) => {
        res.render('todo', {title: 'single todo', todo: results,});
      });
    });
  });

module.exports = todoRouter;

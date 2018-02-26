/* eslint-disable no-console */
import express from 'express';
import {MongoClient as mongodb,} from 'mongodb';
import {ObjectID as objectId,} from 'mongodb';

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://127.0.0.1:27017/';

    mongodb.connect(url, (err, db) => {
      if (err) console.log(err);
      const dbo = db.db('todoapp');
      dbo.collection('todos').find().toArray((err, results) => {
        res.render('todos', {title: 'todos', todos: results,});
      });
    });
  });

todoRouter.route('/:id')
  .get((req, res) => {
    const id = new objectId(req.params.id);
    const url = 'mongodb://127.0.0.1:27017/';


    mongodb.connect(url, (err, db) => {
      if (err) console.log(err);
      const dbo = db.db('todoapp');
      dbo.collection('todos').findOne({_id: id,}, (err, results) => {
        res.render('todo', {title: 'single todo', todo: results,});
      });
    });
  });

module.exports = todoRouter;

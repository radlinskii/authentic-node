/* eslint-disable no-console */
import express from 'express';
import {MongoClient as mongodb,} from 'mongodb';

const adminRouter = express.Router();

let todos = [
  {
    title: 'learn how to manage time',
    author: 'ignacy',
  },
  {
    title: 'CRACKING THE CODING INTERVIEW',
    author: 'aga',
  },
];
let todo = todos[0];
adminRouter.route('/addTodos')
  .get((req, res) => {
    const url = 'mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db';

    mongodb.connect(url, (err, db) => {
      if(err) console.log(err);
      const dbo = db.db('authentic-db');
      dbo.collection('todos').insertOne(todo, (err, results) => {
        if(err) throw err;
        res.redirect('/');
        db.close();
      });
    });
  });

module.exports = adminRouter;

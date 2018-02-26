/* eslint-disable no-console */
import express from 'express';
import {MongoClient as mongodb,} from 'mongodb';

const adminRouter = express.Router();

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
let todo = todos[0];
adminRouter.route('/addTodos')
  .get((req, res) => {
    const url = 'mongodb://127.0.0.1:27017/';

    mongodb.connect(url, (err, db) => {
      if(err) console.log(err);
      const dbo = db.db('todoapp');
      dbo.collection('todos').insertOne(todo, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
        db.close();
      });
    });
  });

module.exports = adminRouter;

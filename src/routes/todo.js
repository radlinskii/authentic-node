/* eslint-disable no-console */
import express from 'express';
import {Client,} from 'pg/lib/index';
import config from '../config';

const router = express.Router();

router.post('/add', (req, res) => {
  const client = new Client(config.conString);
  client.connect()
    .then(() => {
      const sql = 'INSERT INTO tmp (name, age) VALUES ($1, $2);';
      const params = [req.body.name, req.body.age, ];
      return client.query(sql, params);
    })
    .then(() => {
      res.redirect('/todos');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/todos');
    });
});

router.get('/list', (req, res) => {
  const client = new Client(config.conString);
  client.connect()
    .then(() => {
      return client.query('SELECT * FROM tmp;');
    })
    .then((results) => {
      res.json(results.rows);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/todos');
    });
});

module.exports = router;

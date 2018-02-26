/* eslint-disable no-console */
import express from 'express';
import config from '../config';
import {Client,} from 'pg/lib/index';
const router = express.Router();

router.get('/list', (req, res) => {
  const client = new Client(config.conString);
  client.connect()
    .then(() => {
      return client.query('SELECT * FROM users;');
    })
    .then((results) => {
      res.json(results.rows[results.rows.length - 1]);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/profile');
    });
});

router.get('/get', (req, res) => {
  if(req.user) {
    console.log(req.user.name);
    res.json({name: req.user.name,});
  } else {
    console.log('error');
    res.json({name: 'error',});
  }
});

module.exports = router;

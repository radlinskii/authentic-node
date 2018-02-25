/* eslint-disable no-console*/
import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {Client,} from 'pg';

process.env.NODE_ENV = config.NODE_ENV;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false, }));

app.listen(config.port, function listenHandler (err) {
  if (err)
    console.log(err);
  else
    console.info(`${process.env.NODE_ENV} Running on ${config.port}`);
});

app.post('/todo/add', (req, res) => {
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
      res.redirect('/login');
    });
});

app.get('/todo/list', (req, res) => {
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
      res.redirect('/login');
    });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

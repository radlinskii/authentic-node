import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
/* eslint-disable no-console*/
import {Client,} from 'pg';
const conString = process.env.DATABASE_URL;

const app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false, }));

app.get('/',(req, res) => {
  res.render('index');
});

app.listen(config.port, function listenHandler () {
  console.info(`${process.env.NODE_ENV} Running on ${config.port}`);
});

const client = new Client(conString);
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

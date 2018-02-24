import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
/* eslint-disable no-console*/
import {Client,} from 'pg';
const conString = process.env.DATABASE_URL || 'postgres://osodhysfgbxoln:96960c4600b5332965823319c91d4f3c38029c3ec0ca1ba5363f8361dbe1a4be@ec2-79-125-117-53.eu-west-1.compute.amazonaws.com:5432/d9it2nebkl455l?ssl=true';


const app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false, }));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(config.port, function listenHandler (err) {
  if (err)
    console.log(err);
  else
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

app.post('/user/add', (req, res) => {
  console.log('post body: ', req.body);

  const client = new Client(conString);
  client.connect()
    .then(() => {
      const sql = 'INSERT INTO tmp (name, age) VALUES ($1, $2);';
      const params = [req.body.name, req.body.age, ];
      return client.query(sql, params);
    })
    .then((result) => {
      console.log('add result?', result);
      res.redirect('/login');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/login');
    });

});

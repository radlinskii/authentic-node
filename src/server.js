/* eslint-disable no-console*/
import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import auth from './routes/auth';

import passport from './passport';

process.env.NODE_ENV = config.NODE_ENV;

const app = express();

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false,}));
app.use(session({
  secret: 'anything',
  resave: true,
  saveUninitialized: true,
}));

passport(app);

app.listen(config.port, (err) => {
  if (err)
    console.log(err);
  else
    console.info(`${process.env.NODE_ENV} Running on ${config.port}`);
});

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('hello');
});

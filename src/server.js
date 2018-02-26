/* eslint-disable no-console*/
import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import todo from './routes/todo';
import auth from './routes/auth';
import user from './routes/user';

import passport from './passport';
import path from 'path';

process.env.NODE_ENV = config.NODE_ENV;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false,}));
app.use(session({secret: 'anything',}));

passport(app);

app.listen(config.port, function listenHandler(err) {
  if (err)
    console.log(err);
  else
    console.info(`${process.env.NODE_ENV} Running on ${config.port}`);
});

app.use('/todo', todo);
app.use('/user', user);
app.use('/auth', auth);

app.get('/profile', function (req, res, next) {
  if(!req.user) {
    res.redirect('/');
  }
  next();
});

app.use(['/','/profile','/register','/about','/todos',], function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

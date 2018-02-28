/* eslint-disable no-console*/
import config from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import auth from './routes/auth';
import indexRouter from './routes/index';
import todosRouter from './routes/todos';
import aboutRouter from './routes/about';

import passport from './config/passport';
import mongoose from 'mongoose';

process.env.NODE_ENV = config.NODE_ENV;

const app = express();
mongoose.connect('mongodb://admin:admin@ds249128.mlab.com:49128/authentic-db');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));
app.use(cookieParser());
app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: true,
}));
passport(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');



app.listen(config.port, (err) => {
  if (err) console.log(err);
  else console.info(`${process.env.NODE_ENV} Running on ${config.port}`);
});

app.use('/auth', auth);
app.use('/todos', todosRouter);
app.use('/about', aboutRouter);
app.use('/', indexRouter);


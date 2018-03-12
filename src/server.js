/* eslint-disable no-console*/
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './config/passport';
import auth from './routes/auth';
import indexRouter from './routes/index';
import todosRouter from './routes/todos';
import profileRouter from './routes/profile';
import mailerRouter from './routes/mailer';

const app = express();
mongoose.connect(process.env.DatabaseURL, err => {
  if (err) console.error(err);
  else console.info('connected to db');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
passport(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(process.env.PORT, (err) => {
  if (err) console.error(err);
  else console.info(`${process.env.NODE_ENV} Running on ${process.env.PORT}`);
});

app.use('/auth', auth);
app.use('/todos', todosRouter);
app.use('/profile', profileRouter);
app.use('/email', mailerRouter);
app.use('/', indexRouter);
app.use((req, res) => {
  req.flash('error', 'Page not found!');
  res.redirect('/');
});


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
import aboutRouter from './routes/about';

const app = express();
mongoose.connect(process.env.DatabaseURL).then(
  () => { console.info('connected to db'); },
  err => { console.error(err); }
);

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
app.use('/about', aboutRouter);
app.use('/', indexRouter);
app.use((req,res) => {
  res.redirect(`/?error=${encodeURI('page not found')}`);
});


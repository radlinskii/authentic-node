/* eslint-disable no-console*/
import config from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from './config/passport';
import auth from './routes/auth';
import indexRouter from './routes/index';
import todosRouter from './routes/todos';
import aboutRouter from './routes/about';

process.env.NODE_ENV = config.NODE_ENV;

const app = express();
mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`).then(
  () => { console.info(`connected to ${config.dbName}`); },
  err => { console.error(err); }
);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
passport(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(config.port, (err) => {
  if (err) console.error(err);
  else console.info(`${process.env.NODE_ENV} Running on ${config.port}`);
});

app.use('/auth', auth);
app.use('/todos', todosRouter);
app.use('/about', aboutRouter);
app.use('/', indexRouter);
app.use((req,res) => {
  res.redirect(`/?error=${encodeURI('page not found')}`);
});


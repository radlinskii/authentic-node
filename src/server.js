/* eslint-disable no-console*/
import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import auth from './routes/auth';

import passport from './passport';

process.env.NODE_ENV = config.NODE_ENV;

const app = express();


app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

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

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    res.render('todos');
  });

todoRouter.route('/single')
  .get((req, res) => {
    res.send('Hello single todo');
  });

app.use('/todos', todoRouter);

const aboutRouter = express.Router();

aboutRouter.route('')
  .get((req, res) => {
    res.render('about');
  });

app.use('/about', aboutRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hello from render',
  },
  );
});

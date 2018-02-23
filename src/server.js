import config from './config';
import express from 'express';

const app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.static('public'));

app.get('/',(req, res) => {
  res.render('index');
});

app.listen(config.port, function listenHandler () {
  console.info(`${process.env.NODE_ENV} Running on ${config.port}`); //eslint-disable-line no-console
});

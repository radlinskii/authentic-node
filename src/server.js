import config from './config';
import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/',(req, res) => {
  res.render('index');
});


app.listen(config.port, function listenHandler () {
  console.info(`Running on ${config.port}`); //eslint-disable-line no-console
});

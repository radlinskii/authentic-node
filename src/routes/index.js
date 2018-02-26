import express from 'express';

const indexRouter = express.Router();

indexRouter.route('')
  .get((req, res) => {
    res.render('index', {
      title: 'Authentic Node',
    },
    );
  });

module.exports = indexRouter;

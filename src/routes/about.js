import express from 'express';

const aboutRouter = express.Router();

aboutRouter.route('')
  .get((req, res) => {
    res.render('about', {title: 'about',});
  });

module.exports = aboutRouter;

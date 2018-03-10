import express from 'express';

const indexRouter = express.Router();

indexRouter.route('')
  .get((req, res) => {
    const err = req.flash('error')[0];
    if(req.isAuthenticated()) {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: true,
        user: req.user,
        message: err,
      },);
    } else {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: false,
        user: {},
        message: err,
      },);
    }
  });

module.exports = indexRouter;

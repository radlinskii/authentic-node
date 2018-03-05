import express from 'express';

const indexRouter = express.Router();

indexRouter.route('')
  .get((req, res) => {
    if(req.isAuthenticated()) {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: true,
        user: req.user,
      },
      );
    } else {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: false,
        user: {},
      },
      );
    }
  });

module.exports = indexRouter;

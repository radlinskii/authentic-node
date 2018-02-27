import express from 'express';

const indexRouter = express.Router();

indexRouter.route('')
  .get((req, res) => {
    if(req.isAuthenticated()) {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: true,
        username: req.user.username,
      },
      );
    } else {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: false,
        username: '',
      },
      );
    }
  });

module.exports = indexRouter;

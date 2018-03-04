import express from 'express';

const indexRouter = express.Router();

indexRouter.route('')
  .get((req, res) => {
    if(req.isAuthenticated()) {
      res.render('index', {
        title: 'Authentic Node',
        isLoggedIn: true,
        user: {
          username: req.user.username,
          image: req.user.image,
        },
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

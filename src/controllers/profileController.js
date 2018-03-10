import User from '../models/user.model';

const profileController = () => {
  const middleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error', 'Permission denied!');
      res.redirect('/');
    }
    else next();
  };

  const getProfile = (req, res) => {
    res.render('profile', {
      title: 'profile',
      isLoggedIn: req.isAuthenticated(),
      user: req.user,
    });
  };

  const postDelete = (req, res) => {
    if (!req.body.submitDelete) {
      User.findById(req.user.id, (err, user) => {
        if (err) {
          req.flash('error', 'Error deleting Account from Database!');
          res.redirect('/profile');
        }
        if (!user.validPassword(req.body.password)) {
          req.flash('error', 'Incorrect Password!');
          res.redirect('/profile');
        } else {
          user.remove((err) => {
            if (err) {
              req.flash('error', 'Error deleting User from Database!');
              res.redirect('/profile');
            } else {
              if (user.username) req.flash('error', `Goodbye ${user.username}!`);
              else req.flash('error', `Goodbye ${user.githubName}!`);
              res.redirect('/');
            }
          });
        }
      });
    } else {
      User.findOne({ githubID: req.user.githubID, }, (err, user) => {
        if (err) {
          req.flash('error', 'Error deleting Account from Database!');
          res.redirect('/profile');
        }
        user.remove((err) => {
          if (err) {
            req.flash('error', 'Error deleting User from Database!');
            res.redirect('/profile');
          } else {
            req.flash('error', `Goodbye ${user.githubName}!`);
            res.redirect('/');
          }
        });
      });
    }
  };

  return {
    middleware: middleware,
    getProfile: getProfile,
    postDelete: postDelete,
  };
};

module.exports = profileController();

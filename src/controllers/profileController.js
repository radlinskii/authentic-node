import User from '../models/user.model';
import Todo from '../models/todo.model';
import passport from 'passport/lib/index';

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
    User.findById(req.user.id, (err, user) => {
      if (err) {
        req.flash('error', 'Error deleting Account from Database!');
        res.redirect('/profile');
      }
      if (!user.validPassword(req.body.password)) {
        req.flash('error', 'Incorrect Password!');
        res.redirect('/profile');
      } else {
        Todo.deleteMany({ author: req.user.id.toString(), }, err => {
          if (err) {
            req.flash('error', 'Error deleting User from Database!');
            res.redirect('/profile');
          }
          user.remove(err => {
            if (err) {
              req.flash('error', 'Error deleting User from Database!');
              res.redirect('/profile');
            } else {
              req.flash('success', `Goodbye ${user.username}!`);
              res.redirect('/');
            }
          });
        });
      }
    });
  };

  const postDeleteGithub = (req, res) => {
    User.findOne({ githubID: req.user.githubID, }, (err, user) => {
      if (err) {
        req.flash('error', 'Error deleting Account from Database!');
        res.redirect('/profile');
      }
      Todo.deleteMany({ author: req.user.id.toString(), }, err => {
        if (err) {
          req.flash('error', 'Error deleting User from Database!');
          res.redirect('/profile');
        }
        user.remove(err => {
          if (err) {
            req.flash('error', 'Error deleting User from Database!');
            res.redirect('/profile');
          } else {
            req.flash('success', `Goodbye ${user.githubName}!`);
            res.redirect('/');
          }
        });
      });
    });
  };

  const postChangePassword = (req, res) => {
    const user = req.user;
    user.password = user.generateHash(req.body.passwordNew);
    User.findByIdAndUpdate(user._id, user, err => {
      if (err) {
        req.flash('error', 'Error editing password!');
        res.redirect('/profile');
      }
      req.flash('success', 'Password successfully changed!');
      res.redirect('/profile');
    });
  };

  const postConnect = (req, res) => passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/profile',
    failureFlash: true,
  })(req, res);

  return {
    middleware: middleware,
    getProfile: getProfile,
    postDelete: postDelete,
    postConnect: postConnect,
    postDeleteGithub: postDeleteGithub,
    postChangePassword: postChangePassword,
  };
};

module.exports = profileController();

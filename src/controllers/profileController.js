import User from '../models/user';
import Todo from '../models/todo';
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
    User.findById(req.user.id)
      .then(user => {
        if (!user.validPassword(req.body.password)) {
          req.flash('error', 'Incorrect Password!');
          res.redirect('/profile');
        } else {
          Todo.deleteMany({ author: req.user.id.toString(), })
            .then(() => {
              user.remove(() => {
                req.flash('success', `Goodbye ${user.username}!`);
                res.redirect('/');
              });
            });
        }
      })
      .catch(err => {
        req.flash('error', 'Error deleting Account from Database!');
        res.redirect('/profile');
      });
  };

  const postDeleteGithub = (req, res) => {
    User.findOne({ githubID: req.user.githubID, })
      .then(user => {
        Todo.deleteMany({ author: req.user.id.toString(), })
          .then(() => {
            user.remove()
              .then(()=> {
                req.flash('success', `Goodbye ${user.githubName}!`);
                res.redirect('/');
              });
          });
      })
      .catch(err => {
        req.flash('error', 'Error deleting Account from Database!');
        res.redirect('/profile');
      });
  };

  const postChangePassword = (req, res) => {
    User.findById(req.user._id)
      .then(user => {
        if (!user.validPassword(req.body.passwordOld)) {
          req.flash('error', 'Incorrect Old Password!');
          res.redirect('/profile');
        } else {
          const user = req.user;
          user.password = user.generateHash(req.body.passwordNew);
          user.save()
            .then(() => {
              req.flash('success', 'Password successfully changed!');
              res.redirect('/profile');
            });
        }
      })
      .catch(err => {
        req.flash('error', 'Error changing password!');
        res.redirect('/profile');
      });
  };

  const postConnect = (req, res) => passport.authenticate('local-connect', {
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

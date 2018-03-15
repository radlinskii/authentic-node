import User from '../models/User';
import Todo from '../models/Todo';
import passport from 'passport/lib/index';
import validator from 'validator';

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
            req.flash('error', 'Error deleting Account from Database!');
            res.redirect('/profile');
          }
          user.remove(err => {
            if (err) {
              req.flash('error', 'Error deleting Account from Database!');
              res.redirect('/profile');
            }
            req.flash('success', `Goodbye ${user.username}!`);
            res.redirect('/');
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
          req.flash('error', 'Error deleting Account from Database!');
          res.redirect('/profile');
        }
        user.remove(err => {
          if (err) {
            req.flash('error', 'Error deleting Account from Database!');
            res.redirect('/profile');
          }
          req.flash('success', `Goodbye ${user.githubName}!`);
          res.redirect('/');
        });
      });
    });
  };

  const postChangePassword = (req, res) => {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        req.flash('error', 'Error changing password!');
        res.redirect('/profile');
      }
      if (!user.validPassword(req.body.passwordOld)) {
        req.flash('error', 'Incorrect Old Password!');
        res.redirect('/profile');
      } else {
        const user = req.user;
        user.password = user.generateHash(req.body.passwordNew);
        user.save(err => {
          if (err) {
            req.flash('error', 'Error changing password!');
            res.redirect('/profile');
          }
          req.flash('success', 'Password successfully changed!');
          res.redirect('/profile');
        });
      }
    });
  };

  const postChangeEmail = (req, res) => {
    if (!validator.isEmail(req.body.changeEmailInput)) {
      req.flash('error', 'Invalid Email Address!');
      res.redirect('/profile');
    } else {
      User.findById(req.user._id, (err, user) => {
        if (err) {
          req.flash('error', 'Error changing email!');
          res.redirect('/profile');
        }
        if (req.body.changeEmailInput === user.email) {
          req.flash('error', 'It was the Old Email Address!');
          res.redirect('/profile');
        } else {
          if (!user.validPassword(req.body.changeEmailPassword)) {
            req.flash('error', 'Incorrect Password!');
            res.redirect('/profile');
          } else {
            const user = req.user;
            user.email = req.body.changeEmailInput;
            user.save(err => {
              if (err) {
                req.flash('error', 'Error changing email!');
                res.redirect('/profile');
              }
              req.flash('success', 'Email successfully changed!');
              res.redirect('/profile');
            });
          }
        }
      });
    }
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
    postChangeEmail: postChangeEmail,
  };
};

module.exports = profileController();

/* eslint-disable no-console */
import passport from 'passport/lib/index';
import User from '../models/user.model';

const authController = () => {
  const middleware = (req, res, next) => {
    if (!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postRegister = (req, res) => {
    if(req.body.password === req.body.repeatedPassword) {
      User.findOne({username: req.body.username,}, (err, result) => {
        if(!result)
          passport.authenticate('local-signup',
            {successRedirect: '/', failureRedirect: `/?error=${encodeURI('error registering')}`,})(req, res);
        else
          res.redirect(`/?error=${encodeURI('username already in use')}`);
      });
    } else {
      res.redirect(`/?error=${encodeURI('passwords mismatch')}`);
    }
  };

  const postLogin = (req, res) => passport.authenticate('local-signin',
    {successRedirect: '/', failureRedirect: `/?error=${encodeURI('wrong credentials')}`,})(req, res);

  const logout = (req, res) => {
    req.logout();
    res.redirect('/');
  };

  return {
    postRegister: postRegister,
    postLogin: postLogin,
    middleware: middleware,
    logout: logout,
  };
};

module.exports = authController();

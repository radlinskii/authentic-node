/* eslint-disable no-console */
import passport from 'passport/lib/index';

const authController = () => {
  const middleware = (req, res, next) => {
    if (!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postRegister = (req, res) =>
    passport.authenticate('local-signup',
      {successRedirect: '/', failureRedirect: `/?error=${encodeURI('error registering')}`,})(req, res);

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

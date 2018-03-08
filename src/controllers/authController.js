import passport from 'passport/lib/index';

const authController = () => {
  const middleware = (req, res, next) => {
    if (!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postRegister = (req, res) => passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res);

  const postLogin = (req, res) => passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res);

  const logout = (req, res) => {
    req.logout();
    res.redirect('/');
  };

  const githubAuthenticate = (req, res) => passport.authenticate('github')(req, res);

  const githubAuthenticateCB = (req, res) => passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res);

  const githubAuthorizeCB = (req, res) => passport.authorize('github', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res);

  const githubAuthorize = (req, res) => passport.authorize('github', { scope: [ 'user', ], })(req, res);

  return {
    postRegister: postRegister,
    postLogin: postLogin,
    middleware: middleware,
    logout: logout,
    githubAuthenticate: githubAuthenticate,
    githubAuthenticateCB: githubAuthenticateCB,
    githubAuthorize: githubAuthorize,
    githubAuthorizeCB: githubAuthorizeCB,
  };
};

module.exports = authController();

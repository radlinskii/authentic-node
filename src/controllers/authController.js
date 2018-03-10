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

  const unlinkLocal = (req, res) => {
    const user = req.user;
    user.username = undefined;
    user.password = undefined;
    user.save(err => {
      if(err) {
        req.flash('error', 'Error Unlinking Local Account!');
        res.redirect('/profile');
      }
      res.redirect('/profile');
    });
  };

  const unlinkGithub = (req, res) => {
    const user = req.user;
    user.githubID = undefined;
    user.githubEmail = undefined;
    user.githubName = undefined;
    user.save(err => {
      if(err) {
        req.flash('error', 'Error Unlinking Github Account!');
        res.redirect('/profile');
      }
      res.redirect('/profile');
    });
  };

  const githubAuthenticate = (req, res) => passport.authenticate('github')(req, res);

  const githubAuthenticateCB = (req, res) => passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res);

  const githubAuthorize = (req, res) => passport.authorize('github', { scope: [ 'user', ], })(req, res);

  const githubAuthorizeCB = (req, res) => passport.authorize('github', {
    successRedirect: '/profile',
    failureRedirect: '/profile',
    failureFlash: true,
  })(req, res);

  return {
    postRegister: postRegister,
    postLogin: postLogin,
    middleware: middleware,
    logout: logout,
    githubAuthenticate: githubAuthenticate,
    githubAuthenticateCB: githubAuthenticateCB,
    githubAuthorize: githubAuthorize,
    githubAuthorizeCB: githubAuthorizeCB,
    unlinkLocal: unlinkLocal,
    unlinkGithub: unlinkGithub,
  };
};

module.exports = authController();

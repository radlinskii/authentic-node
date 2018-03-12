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

  const unlinkGithub = (req, res) => {
    if(req.user) {
      const user = req.user;
      if (user.validPassword(req.body.unlinkGithubInput)) {
        user.githubID = undefined;
        user.githubName = undefined;
        user.save()
          .then(() => {
            res.redirect('/profile');
          })
          .catch(err => {
            req.flash('error', 'Error Unlinking Github Account!');
            res.redirect('/profile');
          });
      } else {
        req.flash('error', 'Incorrect password!');
        res.redirect('/profile');
      }
    } else {
      req.flash('error', 'Permission Denied!');
      res.redirect('/profile');
    }
  };

  const githubAuthenticate = (req, res) => passport.authenticate('github')(req, res);

  const githubAuthenticateCB = (req, res) => passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res);

  const githubAuthorize = (req, res) => passport.authorize('github')(req, res);

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
    unlinkGithub: unlinkGithub,
  };
};

module.exports = authController();

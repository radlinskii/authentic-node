import passport from 'passport';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user); //null is for error !
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  require('../strategies/local.strategy')();
  require('../strategies/google.strategy')();
  require('../strategies/facebook.strategy')();
};

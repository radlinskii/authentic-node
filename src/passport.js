import passport from 'passport';

export default function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  require('./strategies/google.strategy')();
  require('./strategies/facebook.strategy')();
}

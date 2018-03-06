import passport from 'passport';
import User from '../models/user.model';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  require('../strategies/local.strategy')(passport);
  require('../strategies/github.strategy')(passport);
};

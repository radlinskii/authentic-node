import passport from 'passport';
import User from '../models/user';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch(err => { done(err, false); });
  });

  require('../strategies/local')(passport);
  require('../strategies/github')(passport);
};

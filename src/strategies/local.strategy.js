import passport from 'passport';
import {Strategy as LocalStrategy,} from 'passport-local';

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    let user = {
      username: username,
      password: password,
    };
    done(null, user);
  }));
};

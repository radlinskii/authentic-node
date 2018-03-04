/* eslint-disable no-console */
import mongoose from 'mongoose';
import User from '../models/user.model';
import passport from 'passport/lib/index';

const authController = () => {
  const middleware = (req, res, next) => {
    if (!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postRegister = (req, res) => {
    if ((req.body.password === req.body.repeatedPassword)) {
      User.findOne({username: req.body.username,}, (err, result) => {
        if(err) res.redirect(`/?error=${encodeURI('error registering')}`);
        if (result) res.redirect(`/?error=${encodeURI('username already in use')}`);
        else {
          const user = new User();
          user._id = new mongoose.Types.ObjectId();
          user.username = req.body.username;
          user.password = user.generateHash(req.body.password);

          user.save(err => {
            if(err) res.redirect(`/?error=${encodeURI('error saving profile to db')}`);
            req.login(user, () => {
              res.redirect('/');
            });
          });
        }
      });
    } else {
      res.redirect(`/?error=${encodeURI('passwords mismatch')}`);
    }
  };

  const postLogin = (req, res) => passport.authenticate('local',
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

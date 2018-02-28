/* eslint-disable no-console */
import mongoose from 'mongoose';
import passport from 'passport/lib/index';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model';

const authController = () => {
  const middleware = (req, res, next) => {
    if (!req.isAuthenticated()) res.redirect('/');
    else next();
  };

  const postRegister = (req, res) => {
    if ((req.body.password === req.body.repeatedPassword)) {
      bcrypt.hash(req.body.password, 10).then(function (hash) {
        User.findOne({username: req.body.username,}, (err, result) => {
          if (result) res.redirect('/?error=username%20already%20in%20use');
          else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username : req.body.username,
              password : hash,
            });
            user.save(err => {
              if (err) console.error(err);
              req.login(user, () => {
                res.redirect('/');
              });
            });
          }
        });
      });
    } else {
      res.redirect('/?error=passwords%20mismatch');
    }
  };

  const postLogin = (req, res) => passport.authenticate('local',
    {successRedirect: '/', failureRedirect: '/?error=wrong%20credentials',})(req, res);

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

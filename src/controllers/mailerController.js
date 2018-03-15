/* eslint-disable no-unused-vars */
import nodemailer from 'nodemailer';
import User from '../models/User';

const mailerController = () => {
  const send = (req, res) => {
    if (!req.isAuthenticated()) {
      req.flash('error', 'permission denied');
      res.redirect('/profile');
    } else {
      User.findOne({ email: req.body.emailReset, }, (err, result) => {
        if (err) {
          req.flash('error', 'Error resetting password!');
          res.redirect('/profile');
        }
        if (!result) {
          req.flash('error', 'No such email in database!');
          res.redirect('/profile');
        } else {
          if (!result.password) {
            req.flash('error', 'You have to set a password to be able to reset it!');
            res.redirect('/profile');
          } else {
            const transporter = nodemailer.createTransport({
              host: process.env.mailService,
              port: process.env.mailPort,
              secure: process.env.mailSecure,
              auth: {
                user: process.env.mailUser,
                pass: process.env.mailPassword,
              },
              tls: {
                rejectUnauthorized: process.env.mailTls,
              },
            });

            const newPassword = (Math.floor(Math.random() * 9000000) + 1000000).toString();
            const message = {
              from: `"Ignacy Radliński" <${process.env.mailUser}>`,
              to: result.email,
              subject: 'reset your password',
              text: `Hello ${result.username},
                    Your new password  on authentic-node is ${newPassword}
                    If you dont recognize this message pls ignore it. 
                    *Do not answer, this is an automatic message.`,
              html: `<p><b>Hello</b> ${result.username},</p>
                    <p>Your new password  on <a href="https://authentic-node.herokuapp.com">authentic-node</a> is <b>${newPassword}</b></p>
                    <p>If you dont recognize this message pls ignore it</p>
                    <p><small>*Do not answer, this is an automatic message</small></p>`,
            };
            transporter.sendMail(message, (err, info) => {
              if (err) {
                req.flash('error', 'Error resetting password!');
                res.redirect('/profile');
              }
              const user = result;
              user.password = user.generateHash(newPassword);
              user.save(err => {
                if (err) {
                  req.flash('error', 'Error resetting password!');
                  res.redirect('/profile');
                }
                req.flash('success', 'New password send to your mail');
                res.redirect('/profile');
              });
            });
          }
        }
      });
    }
  };

  const reset = (req, res) => {
    User.findOne({ email: req.body.emailReset, }, (err, result) => {
      if (err) {
        req.flash('error', 'Error resetting password!');
        res.redirect('/');
      }
      if (!result) {
        req.flash('error', 'No such email in database!');
        res.redirect('/');
      } else {
        if (!result.password) {
          req.flash('error', 'You have to set a password to be able to reset it!');
          res.redirect('/');
        } else {
          const transporter = nodemailer.createTransport({
            host: process.env.mailService,
            port: process.env.mailPort,
            secure: process.env.mailSecure,
            auth: {
              user: process.env.mailUser,
              pass: process.env.mailPassword,
            },
            tls: {
              rejectUnauthorized: process.env.mailTls,
            },
          });

          const newPassword = (Math.floor(Math.random() * 9000000) + 1000000).toString();
          const message = {
            from: `"Ignacy Radliński" <${process.env.mailUser}>`,
            to: result.email,
            subject: 'reset your password',
            text: `Hello ${result.username},
                    Your new password  on authentic-node is ${newPassword}
                    If you dont recognize this message pls ignore it. 
                    *Do not answer, this is an automatic message.`,
            html: `<p><b>Hello</b> ${result.username},</p>
                    <p>Your new password  on <a href="https://authentic-node.herokuapp.com">authentic-node</a> is <b>${newPassword}</b></p>
                    <p>If you dont recognize this message pls ignore it</p>
                    <p><small>*Do not answer, this is an automatic message</small></p>`,
          };
          transporter.sendMail(message, (err, info) => {
            if (err) {
              req.flash('error', 'Error resetting password!');
              res.redirect('/');
            }
            const user = result;
            user.password = user.generateHash(newPassword);
            user.save(err => {
              if (err) {
                req.flash('error', 'Error resetting password!');
                res.redirect('/');
              }
              req.flash('success', 'New password send to your mail');
              res.redirect('/');
            });
          });
        }
      }
    });
  };

  return {
    send: send,
    reset: reset,
  };
};

module.exports = mailerController();

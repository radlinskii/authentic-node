import nodemailer from 'nodemailer';
import User from '../models/user';

const mailerController = () => {
  const send = (req, res) => {
    if(req.isAuthenticated()){
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
        to: req.user.email,
        subject: 'reset your password',
        text: `Hello ${req.user.username},
                    Your new password  on authentic-node is ${newPassword}
                    If you dont recognize this message pls ignore it. 
                    *Do not answer, this is an automatic message.`,
        html: `<p><b>Hello</b> ${req.user.username},</p>
                    <p>Your new password  on <a href="https://authentic-node.herokuapp.com">authentic-node</a> is <b>${newPassword}</b></p>
                    <p>If you dont recognize this message pls ignore it/</p>
                    <p><small>*Do not answer, this is an automatic message/</small></p>`,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          req.flash('error', 'Error resetting password!');
          res.redirect('/profile');
        } else {
          const user = req.user;
          user.password = user.generateHash(newPassword);
          user.save()
            .then(() => {
              req.flash('success', 'New password send to your mail');
              res.redirect('/profile');
            })
            .catch(err => {
              req.flash('error', 'Error resetting password!');
              res.redirect('/profile');
            });
        }
      });
    } else {
      req.flash('error', 'Permission Denied');
      res.redirect('/profile');
    }
  };

  const reset = (req, res) => {
    User.findOne({ email: req.body.emailReset, })
      .then(result => {
        if(result) {
          if (result.password) {
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
                    <p>If you dont recognize this message pls ignore it/</p>
                    <p><small>*Do not answer, this is an automatic message/</small></p>`,
            };
            transporter.sendMail(message, (err, info) => {
              if (err) {
                req.flash('error', 'Error resetting password!');
                res.redirect('/');
              } else {
                const user = result;
                user.password = user.generateHash(newPassword);
                user.save()
                  .then(() => {
                    req.flash('success', 'New password send to your mail');
                    res.redirect('/');
                  })
                  .catch(err => {
                    req.flash('error', 'Error resetting password!');
                    res.redirect('/');
                  });
              }
            });
          } else {
            req.flash('error', 'You have to set a password to be able to reset it!');
            res.redirect('/');
          }
        } else {
          req.flash('error', 'No such email in database!');
          res.redirect('/');
        }
      })
      .catch(err => {
        req.flash('error', 'Error resetting password!');
        res.redirect('/');
      });
  };

  return {
    send: send,
    reset: reset,
  };
};

module.exports = mailerController();

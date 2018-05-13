[![Build Status](https://travis-ci.org/radlinskii/authentic-node.svg?branch=master)](https://travis-ci.org/radlinskii/authentic-node)

Deployed to Heroku at 
https://authentic-node.herokuapp.com/
--

## features:
- [x] *updating* email address
- [x] *resetting* forgotten password by sending an email with a new the one.
- [x] *deleting* the account.
- [x] *changing* local password.
- [x] *unlinking* local strategy from the account.
- [x] *unlinking* github strategy from the account.
- [x] *logging in* with a github account authorization.
- [x] *signing in* with local strategy.
- [x] *registering* with local strategy.
- [x] *CRUD* operations on ToDos.

## installing instructions
1. **npm install** <- installing packages and dependencies
2. **npm start** <- transpiling & starting the app
--

### To run the server on your local machine you need to initialize in .env file following variables 
```
PORT
NODE_ENV
DatabaseURL
githubClientID
githubClientSecret
mailPassword
mailPort
mailSecure
mailService
mailTls
mailUser
```

## this app is using
* **express**
* **passport**
* **mongodb**
* **oauth**
* **nodemailer**
* mongoose
* mocha
* bcrypt
* ejs
* sass
* babel
* eslint
* dotenv
* npm scripts

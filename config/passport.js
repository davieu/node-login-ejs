const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');
                          // passport is passes in from the app.js file
module.exports = function(passport) {
  passport.use(         // Setting usernameField to 'email' which I am using as the username
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match User- check and see if the email inputted is registered. 
      User.findOne({ email: email })
        // .then returns a promise which is the user's email input. If the email is not found in the DB then it will return null and give error that the email is not registered. User needs to create account.
        // user is user object from the DB. it has hashed PW, email, date, and name
        .then(user => {
          // If no match. Then error will say to register the email
          if(!user) {
            // Always want to return done. Done() is the callback. done(error, user, options)
            // Passed in: Null is the error, false for the user, for options we put in a message
            return done(null, false, { message: 'That email is not registered' });
          }

          // Match password
          // passed in: password is the inputed from login form. user.password is the hashed pw from the DB
          // isMatch is a boolean. cmopares the pw from the login form and the hashed pw from DB
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
              // return null for the error, and the user object for the user argument. done(error, user, options)
              // if the passwords match then we pass in the user object.
              return done(null, user);
            } else {
              // PW's don't match:
              // pass in null for error, false for user since PW's didn't match, and send options with error msg.
              return done(null, false, { message: 'The email or password is incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })
}
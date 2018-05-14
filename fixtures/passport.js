const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.use('login', new LocalStrategy(
  {usernameField: 'name', passwordField: 'password'},
  (login, password, done) => {  
    User.findOne({name: login})
      .select('_id password')
      .then(data => {        
        if (!data) {
          done(false)
        }
  
        bcrypt.compare(password, data.password)
          .then(result => {
            if (result) {
              done(null, {id:data._id})
            } else {
              done(null, false);
            }
          })
  
      })
      .catch(done);
  }));
  
  
  passport.serializeUser(function (user, done) {
    console.log('serialize %j', user);
    done(null, {id:user.id});
  });
  
  passport.deserializeUser(function ({id}, done) {
    console.log('deserialize %s', id);
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(done);
  });
  
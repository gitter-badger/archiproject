'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  OAuth2Strategy = require('passport-oauth2'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(config) {
  // Use google strategy
  passport.use('harvest', new OAuth2Strategy({
    authorizationURL: config.harvest.authorizationURL,
    tokenURL: config.harvest.tokenURL,
    clientID: config.harvest.clientID,
    clientSecret: config.harvest.clientSecret,
    callbackURL: config.harvest.callbackURL
  }, function(accessToken, refreshToken, profile, cb) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    console.log('profile', profile);

    // User.findById(req.user._id, function(err, user) {
    //   if (err) {
    //     return cb(err);
    //   }
    //   console.log(user);
    // });
  }));
};

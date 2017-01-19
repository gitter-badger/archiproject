'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  OAuth2Strategy = require('passport-oauth2'),
  users = require('../../controllers/users.server.controller');

module.exports = function(config) {
  // Use google strategy
  passport.use('harvest', new OAuth2Strategy({
    authorizationURL: config.harvest.authorizationURL,
    tokenURL: config.harvest.tokenURL,
    clientID: config.harvest.clientID,
    clientSecret: config.harvest.clientSecret,
    callbackURL: config.harvest.callbackURL,
    passReqToCallback: true
  }, function(accessToken, refreshToken, profile, cb) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
  }));
};

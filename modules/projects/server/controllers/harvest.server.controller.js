'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config')),
  passport = require('passport');

// let harvest = new Harvest({
//   subdomain: config.harvest.authorizationURL,
//   identifier: config.harvest.clientID,
//   secret: config.harvest.clientSecret,
//   redirect_uri: config.harvest.callbackURL
// });

/**
 * OAuth provider call
 */
exports.authorizeCall = function(req, res, next) {
  if (req.query && req.query.redirect_to)
    req.session.redirect_to = req.query.redirect_to;


  passport.authorize('harvest', function(err, user, info) {
    console.log(err);
    console.log(user);
    console.log(info);
  })(req, res, next);

};

/**
 * List of Projects
 */
exports.authorizeCallback = function(req, res) {
  console.log(req.user);

  User.findById(req.user._id, function(err, user) {
    if (err) {
      return console.log(err);
    }
    console.log(user);
  });
  passport.authorize('twitter-authz', { failureRedirect: '/account' },
  function(req, res) {
    var user = req.user;
    var account = req.account;

    // Associate the Twitter account with the logged-in user.
    account.userId = user.id;
    account.save(function(err) {
      if (err) { return self.error(err); }
      res.json({
        message: 'It worked!'
      });
    });
  });
};

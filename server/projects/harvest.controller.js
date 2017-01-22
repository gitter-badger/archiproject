'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  refresh = require('passport-oauth2-refresh'),
  errorHandler = require(path.resolve('./server/core/errors/errors.controller')),
  config = require(path.resolve('./config/config')),
  passport = require('passport');

/**
 * OAuth provider call
 */
// exports.authorizeCall = function(req, res, next) {
//   if (req.query && req.query.redirect_to)
//     req.session.redirect_to = req.query.redirect_to;
//
//
//   passport.authenticate('harvest', function(err, user, info) {
//     console.log(err);
//     console.log(user);
//     console.log(info);
//   })(req, res, next);
//
// };

/**
 * Refreshes the Harvest token if it has expired
 */
exports.refreshToken = function(req, res, next) {
  let user = req.user;

  if (user.harvest.expires.getTime() > new Date().getTime()) {
    refresh.requestNewAccessToken('harvest', user.harvest.refreshToken, function(err, accessToken, refreshToken) {
      User.findByIdAndUpdate(user._id, {
        $set: {
          'harvest.token': accessToken,
          'harvest.expires': new Date() + 64799000
        }
      }, {
        new: true
      }, function(err, user) {
        if (err) {
          return console.error(err);
        }
        next();
      });
    });
  }
};

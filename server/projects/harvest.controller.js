'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./server/core/errors/errors.controller')),
  config = require(path.resolve('./config/config')),
  passport = require('passport');

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
  // console.log(req.user);
  //
  // console.log(req.params);
  // console.log(req.query);
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      'harvest.code': req.query.code
    }
  }, {
    new: true
  }, function(err, user) {
    if (err) {
      return console.error(err);
    }
    res.json({
      message: user
    });
  });
};

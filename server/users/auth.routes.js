'use strict';

/**
 * Module dependencies
 */
var passport = require('passport');

module.exports = function (app) {
  // User Routes
  var users = require('./users.controller');

  // Setting up the users authentication api
  app.route('/api/auth/signout').get(users.signout);

  // Setting the google oauth routes
  app.route('/api/auth/google').get(users.oauthCall('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.route('/api/auth/google/callback').get(users.oauthCallback('google'));

  app.route('/api/auth/harvest').get(users.oauthCallback('harvest'));
  app.route('/api/auth/harvest/callback').get(users.harvestCallback('harvest'));
};

'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config')),
  Harvest = require('harvest');

/**
 * Module init function.
 */
module.exports = function(app, db) {
  app.harvest = new Harvest({
    subdomain: config.harvest_oauth.subdomain,
    identifier: config.harvest_oauth.client_id,
    secret: config.harvest_oauth.secret,
    redirect_uri: config.harvest_oauth.redirect_uri
  });

  // app.harvest.parseAccessCode({}, function(access_token) {
  //   console.log('Grabbed the access token', access_token);

  var TimeTracking = app.harvest.TimeTracking;

  TimeTracking.daily({}, function(err, tasks) {
    if (err) throw new Error(err);
    console.log(tasks);
    console.log('Loaded tasks using oauth!');
  });
  // });
};

'use strict';

/**
 * Module dependencies
 */
var projectsPolicy = require('./projects.policy'),
  passport = require('passport'),
  projects = require('./projects.controller'),
  harvest = require('./harvest.controller');

module.exports = function(app) {
  // Projects collection routes
  app.route('/api/projects').all(harvest.refreshToken, projectsPolicy.isAllowed)
    .get(projects.list)
    .post(projects.create);

  // Single project routes
  app.route('/api/projects/:projectId').all(harvest.refreshToken, projectsPolicy.isAllowed)
    .get(projects.read)
    .put(projects.update)
    .delete(projects.delete);

  // Finish by binding the project middleware
  app.param('projectId', projects.projectByID);
};

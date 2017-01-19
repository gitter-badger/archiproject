'use strict';

/**
 * Module dependencies
 */
var projectsPolicy = require('../policies/projects.server.policy'),
  projects = require('../controllers/projects.server.controller');

module.exports = function(app) {
  // Projects collection routes
  app.route('/api/projects').all(projectsPolicy.isAllowed)
    .get(projects.list)
    .post(projects.create);

  app.route('/api/projects/harvest/auth').all(projectsPolicy.isAllowed).get(projects.oauthCall);
  app.route('/api/projects/harvest/auth/callback').all(projectsPolicy.isAllowed).get(projects.oauthCallback);

  // Single project routes
  app.route('/api/projects/:projectId').all(projectsPolicy.isAllowed)
    .get(projects.read)
    .put(projects.update)
    .delete(projects.delete);

  // Finish by binding the project middleware
  app.param('projectId', projects.projectByID);
};

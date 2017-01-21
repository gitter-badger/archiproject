(function () {
  'use strict';

  angular
    .module('projects.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.projects', {
        abstract: true,
        url: '/projects',
        template: '<ui-view/>'
      })
      .state('admin.projects.list', {
        url: '',
        templateUrl: '/client/projects/list-projects.tpl.html',
        controller: 'ProjectsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.projects.create', {
        url: '/create',
        templateUrl: '/client/projects/form-project.tpl.html',
        controller: 'ProjectsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          projectResolve: newProject
        }
      })
      .state('admin.projects.edit', {
        url: '/:projectId/edit',
        templateUrl: '/client/projects/form-project.tpl.html',
        controller: 'ProjectsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          projectResolve: getProject
        }
      });
  }

  getProject.$inject = ['$stateParams', 'ProjectsService'];

  function getProject($stateParams, ProjectsService) {
    return ProjectsService.get({
      projectId: $stateParams.projectId
    }).$promise;
  }

  newProject.$inject = ['ProjectsService'];

  function newProject(ProjectsService) {
    return new ProjectsService();
  }
}());

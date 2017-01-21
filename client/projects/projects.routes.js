(function () {
  'use strict';

  angular
    .module('projects.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('projects', {
        abstract: true,
        url: '/projects',
        template: '<ui-view/>'
      })
      .state('projects.list', {
        url: '',
        templateUrl: '/client/projects/list-projects.tpl.html',
        controller: 'ProjectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Projects List'
        }
      })
      .state('projects.view', {
        url: '/:projectId',
        templateUrl: '/client/projects/view-project.tpl.html',
        controller: 'ProjectsController',
        controllerAs: 'vm',
        resolve: {
          projectResolve: getProject
        },
        data: {
          pageTitle: 'Project {{ projectResolve.title }}'
        }
      });
  }

  getProject.$inject = ['$stateParams', 'ProjectsService'];

  function getProject($stateParams, ProjectsService) {
    return ProjectsService.get({
      projectId: $stateParams.projectId
    }).$promise;
  }
}());

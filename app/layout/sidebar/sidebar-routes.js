(function () {
  'use strict';

  angular
    .module('layout.sidebar')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('sidebar', {
        url: '/sidebar',
        templateUrl: 'layout/sidebar/sidebar.tpl.html',
        controller: 'SidebarCtrl',
        controllerAs: 'sidebar'
      });
  }
}());

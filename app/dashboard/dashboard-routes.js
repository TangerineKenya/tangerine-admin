(function () {
  'use strict';

  angular
    .module('dashboard')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      });
  }
}());

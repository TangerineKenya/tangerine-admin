(function () {
  'use strict';

  angular
    .module('core.login')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'core/login/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('app.users', {
        url: '/users',
        templateUrl: 'users/users.tpl.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      });
  }
}());

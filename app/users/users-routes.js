(function () {
  'use strict';

  angular
    .module('users')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home.users', {
        url: '/users',
        templateUrl: 'users/users.tpl.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      })
      .state('home.user', {
        url: '/view/:id',
        templateUrl: 'users/view/view.tpl.html',
        controller: 'ViewCtrl',
        controllerAs: 'vm'
      });
  }
}());

(function() {
  'use strict';

  angular
    .module('users')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home.users',
        config: {
          url: '/users',
          templateUrl: 'users/users.tpl.html',
          controller: 'UsersCtrl',
          controllerAs: 'vm',
          bindToController: true

        }
      },{
        state: 'home.user',
        config: {
          url: '/view/:id',
          templateUrl: 'users/view/view.tpl.html',
          controller: 'UserCtrl',
          controllerAs: 'vm',
          bindToController: true
        }
      }
    ];
  }
})();

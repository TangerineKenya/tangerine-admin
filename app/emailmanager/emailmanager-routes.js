(function () {
  'use strict';

  angular
    .module('emailmanager')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home.emailmanager',
        config: {
          url: '/emailmanager',
          templateUrl: 'emailmanager/emailmanager.tpl.html',
          controller: 'EmailmanagerCtrl',
          controllerAs: 'vm',
          bindToController: true

        }
      },
      {
        state: 'home.adduser',
        config: {
          url: '/adduser/:id',
          templateUrl: 'emailmanager/adduser/adduser.tpl.html',
          controller: 'AdduserCtrl',
          controllerAs: 'vm',
          bindToController: true
        }
      }
    ];
  }
})();

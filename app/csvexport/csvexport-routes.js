(function () {
  'use strict';

  angular
    .module('csvexport')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home.export',
        config: {
          url: '/csvexport',
          templateUrl: 'csvexport/csvexport.tpl.html',
          controller: 'CsvexportCtrl',
          controllerAs: 'vm',
          bindToController: true
        }
      }
    ];
  }
})();

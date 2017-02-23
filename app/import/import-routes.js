(function () {
  'use strict';

  angular
    .module('import')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home.import', {
        url: '/import',
        templateUrl: 'import/import.tpl.html',
        controller: 'ImportCtrl',
        controllerAs: 'vm'
      });
  }
}());

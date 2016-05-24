(function () {
  'use strict';

  angular
    .module('location')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'location/location.tpl.html',
        controller: 'LocationCtrl',
        controllerAs: 'vm'
      })
      .state('editCounty', {
        url: '/edit-county/:countyID',
        templateUrl: 'location/edit-county.tpl.html',
        controller: 'EditCountyCtrl',
        controllerAs: 'vm'
      });
  }
}());

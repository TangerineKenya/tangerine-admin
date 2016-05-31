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
        controllerAs: 'vm',
        bindToController: true
      })
      .state('location.newCounty', {
        url: '/location/county/new-county',
        templateUrl: '/location/county/new-county.tpl.html',
        controller: 'NewCountyCtrl',
        controllerAs: 'vm'
      })
      .state('location.editCounty', {
        url: '/location/county/edit-county/:countyID/:name',
        templateUrl: 'location/county/edit-county.tpl.html',
        controller: 'EditCountyCtrl',
        controllerAs: 'county',
        bindToController: true
      })
      .state('location.listSubcounty', {
        url: '/subcounty/list-subcounty/:id/:name',
        templateUrl: 'location/subcounty/list-subcounty.tpl.html',
        controller: 'ListSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('location.editSubcounty', {
        url: '/subcounty/edit-subcounty/:id/:name',
        templateUrl: 'location/subcounty/edit-subcounty.tpl.html',
        controller: 'EditSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('location.newSubcounty', {
        url: '/subcounty/new-subcounty/:id',
        templateUrl: 'location/subcounty/new-subcounty.tpl.html',
        controller: 'NewSubcountyCtrl',
        controllerAs: 'vm'
      });
  }
}());

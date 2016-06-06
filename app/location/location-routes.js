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
        url: '/subcounty/edit-subcounty/:county/:id/:name',
        templateUrl: 'location/subcounty/edit-subcounty.tpl.html',
        controller: 'EditSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('location.newSubcounty', {
        url: '/subcounty/new-subcounty/:id',
        templateUrl: 'location/subcounty/new-subcounty.tpl.html',
        controller: 'NewSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('location.listZone', {
        url: '/zone/list-zone/:county/:subcounty',
        templateUrl: 'location/zone/list-zone.tpl.html',
        controller: 'ListZoneCtrl',
        controllerAs: 'vm'
      })
      .state('location.newZone', {
        url: '/zone/new-zone/:county/:subcounty',
        templateUrl: 'location/zone/new-zone.tpl.html',
        controller: 'NewZoneCtrl',
        controllerAs: 'vm'
      })
      .state('location.editZone', {
        url: '/zone/edit-zone/:county/:subcounty/:zone',
        templateUrl: 'location/zone/edit-zone.tpl.html',
        controller: 'EditZoneCtrl',
        controllerAs: 'vm'
      })
      .state('location.listSchools', {
        url: '/school/list-schools/:county/:subcounty/:zone',
        templateUrl: 'location/school/list-schools.tpl.html',
        controller: 'ListSchoolsCtrl',
        controllerAs: 'vm'
      })
      .state('location.editSchool', {
        url: '/school/edit-school/:county/:subcounty/:zone/:school',
        templateUrl: 'location/school/edit-school.tpl.html',
        controller: 'EditSchoolCtrl',
        controllerAs: 'vm'
      })
      .state('location.newSchool', {
        url: '/school/new-school/:county/:subcounty/:zone',
        templateUrl: 'location/school/new-school.tpl.html',
        controller: 'NewSchoolCtrl',
        controllerAs: 'vm'
      });
  }
}());

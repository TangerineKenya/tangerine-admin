(function () {
  'use strict';

  angular
    .module('location')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('app.location', {
        url: '/location',
        templateUrl: 'location/location.tpl.html',
        controller: 'LocationCtrl',
        controllerAs: 'vm',
        bindToController: true
      })
      .state('app.location.newCounty', {
        url: '/location/county/new-county',
        templateUrl: '/location/county/new-county.tpl.html',
        controller: 'NewCountyCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.editCounty', {
        url: '/location/county/edit-county/:countyID/:name',
        templateUrl: 'location/county/edit-county.tpl.html',
        controller: 'EditCountyCtrl',
        controllerAs: 'county',
        bindToController: true
      })
      .state('app.location.listSubcounty', {
        url: '/subcounty/list-subcounty/:id/:name',
        templateUrl: 'location/subcounty/list-subcounty.tpl.html',
        controller: 'ListSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.editSubcounty', {
        url: '/subcounty/edit-subcounty/:county/:id/:name',
        templateUrl: 'location/subcounty/edit-subcounty.tpl.html',
        controller: 'EditSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.newSubcounty', {
        url: '/subcounty/new-subcounty/:id',
        templateUrl: 'location/subcounty/new-subcounty.tpl.html',
        controller: 'NewSubcountyCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.listZone', {
        url: '/zone/list-zone/:county/:subcounty',
        templateUrl: 'location/zone/list-zone.tpl.html',
        controller: 'ListZoneCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.newZone', {
        url: '/zone/new-zone/:county/:subcounty',
        templateUrl: 'location/zone/new-zone.tpl.html',
        controller: 'NewZoneCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.editZone', {
        url: '/zone/edit-zone/:county/:subcounty/:zone',
        templateUrl: 'location/zone/edit-zone.tpl.html',
        controller: 'EditZoneCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.listSchools', {
        url: '/school/list-schools/:county/:subcounty/:zone',
        templateUrl: 'location/school/list-schools.tpl.html',
        controller: 'ListSchoolsCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.editSchool', {
        url: '/school/edit-school/:county/:subcounty/:zone/:school',
        templateUrl: 'location/school/edit-school.tpl.html',
        controller: 'EditSchoolCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.newSchool', {
        url: '/school/new-school/:county/:subcounty/:zone',
        templateUrl: 'location/school/new-school.tpl.html',
        controller: 'NewSchoolCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.moveSchool', {
        url: '/school/move-school/:county/:subcounty/:zone/:school',
        templateUrl: 'location/school/move-school.tpl.html',
        controller: 'MoveSchoolCtrl',
        controllerAs: 'vm'
      });
  }
}());

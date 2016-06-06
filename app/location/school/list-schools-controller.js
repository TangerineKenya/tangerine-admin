(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:ListSchoolsCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('ListSchoolsCtrl', ListSchoolsCtrl);

  ListSchoolsCtrl.$inject = ['LocationService','$stateParams','$q'];

  function ListSchoolsCtrl(LocationService,$stateParams,$q) {
    var vm = this;
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.zoneId = $stateParams.zone;
    vm.schools = {};

    activate();
    ////////////////////////////////////////////
    function activate(){
      var promises = [getSchools()];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Schools have been loaded');
      });
    }

    function getSchools(){
      vm.locationList=LocationService.getLocations();
      var path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId; 

      vm.schools = _.get(vm.locationList, path); 

      console.log('Schools List',vm.schools);
    }

  }
}());

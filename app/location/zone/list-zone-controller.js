(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:ListZoneCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('ListZoneCtrl', ListZoneCtrl);

  ListZoneCtrl.$inject = ['LocationService', '$stateParams', '$q'];

  function ListZoneCtrl(LocationService, $stateParams,$q) {
    var vm = this;
    var path = '';
    vm.locationList = {};
    vm.subId = $stateParams.subcounty;
    vm.countyId = $stateParams.county;
    vm.subName = '';
    vm.zones = {};
   
    activate();

    //////////////////////////////////////////////////////////////
    function activate(){
      var promises = [getZones()];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Zones have been loaded');
      });
    }
    //get list zones in sub county
    function getZones(){
      vm.locationList=LocationService.getLocations();
      path = 'locations.'+vm.countyId+'.children.'+vm.subId; 

      vm.subName = _.get(vm.locationList, path+'.label');

      vm.zones = _.get(vm.locationList, path); //vm.locationList.locations;

      console.log('Zones List', vm.zones);
    }
  }
}());

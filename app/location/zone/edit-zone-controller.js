(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:EditZoneCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('EditZoneCtrl', EditZoneCtrl);

  EditZoneCtrl.$inject = ['LocationService','$stateParams'];

  function EditZoneCtrl(LocationService,$stateParams) {
    var vm = this;
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.zoneId = $stateParams.zone;
    vm.name = '';
    vm.save = save;

    ///////////////////////////////////////////////////
    function activate(){

    }

    function getDetails(){
      //get county & sub county details
    }

    function save(){

      vm.locationList = LocationService.locationList;
      var path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.label';
      //var doc =_.get(vm.locationList,path);
      var doc =  _.set(vm.locationList, path, vm.name);

      LocationService.save(doc);
      
      console.log('Zone Updated',vm.name,doc);
    }
  }
}());

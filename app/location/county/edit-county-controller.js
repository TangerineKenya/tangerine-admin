(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:EditCountyCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('EditCountyCtrl', EditCountyCtrl);

  EditCountyCtrl.$inject = ['LocationService', '$q', '$stateParams'];

  function EditCountyCtrl(LocationService, $q, $stateParams) {
    var vm = this;
    vm.locationList = {};
    vm.countyID = $stateParams.countyID;
    vm.name = $stateParams.name;
    vm.save = save;

    init();

    //////////////////////////////////////////////////////////////
    
    function init() {
      
    }
    //save new details
    function save () {
      vm.locationList=LocationService.locationList;
      var path = 'locations.'+vm.countyID+'.label';
      var doc =  _.set(vm.locationList, path, vm.name);

      LocationService.save(doc);

      console.log('New Object',doc);  
    }
    //delete
    function deleteCounty() {

    }
  }
}());

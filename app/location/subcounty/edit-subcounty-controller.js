(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:EditSubcountyCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('EditSubcountyCtrl', EditSubcountyCtrl);

  EditSubcountyCtrl.$inject = ['LocationService','$q','$stateParams'];

  function EditSubcountyCtrl(LocationService,$q,$stateParams) {
    var vm = this;
    vm.subId = $stateParams.id;
    vm.countyId = $stateParams.county;
    vm.name = $stateParams.name;
    vm.locationList = {};
    vm.save = save;

    /////////////////////////////////////////////
    function save(){
      vm.locationList=LocationService.locationList;
      var path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.label';
      //var doc =_.get(vm.locationList,path);
      var doc =  _.set(vm.locationList, path, vm.name);

      LocationService.save(doc);
      
      console.log('Subcounty Saved',vm.subId,path,doc);

    }
  }
}());

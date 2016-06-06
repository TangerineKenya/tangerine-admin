(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:ListSubcountyCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('ListSubcountyCtrl', ListSubcountyCtrl);

  ListSubcountyCtrl.$inject= ['LocationService','$stateParams','$q'];

  function ListSubcountyCtrl(LocationService,$stateParams,$q) {
    var vm = this;
    vm.subcounties = {};
    vm.locationList={};
    vm.id = $stateParams.id;
    vm.name = $stateParams.name;

    activate();

    //////////////////////////////////////////////////////////////
    function activate(){
      var promises = [getSubcounties()]; //[getMessageCount(), getSchools(), ];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Subcounties have been loaded');
         //console.log("log 2: ",vm);
      });
    }
  
    //get list of sub counties
    function getSubcounties(){
      vm.locationList=LocationService.getLocations();
      var path = 'locations.'+vm.id; 
      vm.subcounties = _.get(vm.locationList, path); //vm.locationList.locations;

      console.log('Sub counties',vm.subcounties);
    }
  }
}());
;
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
  EditCountyCtrl.$inject = ['$stateParams','DataService','LocationService'];
  function EditCountyCtrl($stateParams,DataService,LocationService) {
    var vm = this;
    vm.county={}; //object to hold county details
    vm.countyID=$stateParams.countyID;
    
    getCounty(vm.countyID);
    function getCounty(countyID){
      //_.findKey(users, { 'age': 1, 'active': true });
      console.log(countyID);
      //get county details
    }
    function postCounty(){
      //update county details
    }
  }
}());

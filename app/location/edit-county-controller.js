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
  EditCountyCtrl.$inject = ['$stateParams','DataService'];
  function EditCountyCtrl($stateParams,DataService) {
    var vm = this;
    vm.county={}; //object to hold county details
    vm.countyID=$stateParams.countyID;
    getCounty(vm.countyID);
    function getCounty(countyID){
      console.log(countyID);
      //ge county details
    }
    function postCounty(){
      //update county details
    }
  }
}());

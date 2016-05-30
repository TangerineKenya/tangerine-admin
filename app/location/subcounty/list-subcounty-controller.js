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

  ListSubcountyCtrl.$inject= ['LocationService','$stateParams'];

  function ListSubcountyCtrl(LocationService,$stateParams) {
    var vm = this;
    vm.subcounties = {};
    vm.id = $stateParams.id;
    vm.name = $stateParams.name;

    activate();

    //////////////////////////////////////////////////////////////
    function activate(){

    }
    //get list of sub counties
    function getSubcounties(){

    }
  }
}());

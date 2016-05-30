(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:NewCountyCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('NewCountyCtrl', NewCountyCtrl);

  NewCountyCtrl.$inject = ['LocationService','$q'];

  function NewCountyCtrl(LocationService,$q) {
    var vm = this;
    vm.save = save;
    vm.name = '';
    vm.code ='';
    vm.locationList={};
    vm.key = '';

    function save(){
      vm.locationList=LocationService.locationList;
      vm.key = '55599987';
      var doc ={
          locations:{
              '55987799':{
                code:vm.code,
                id:vm.key,
                label:vm.name,
                quota:0,
                children:{}
              }
          }
        };

      var newDoc = _.merge(vm.locationList, doc);

      LocationService.save(newDoc);

      //redirect to location list

      //log 
      console.log('here',newDoc);
    }
  }
}());

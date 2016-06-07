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

  NewCountyCtrl.$inject = ['LocationService', '$q'];

  function NewCountyCtrl(LocationService, $q) {
    var vm = this;
    var newDoc ={};
    var doc ={ locations:{}};
    vm.save = save;
    vm.name = '';
    vm.code ='';
    vm.locationList={};
    vm.key = '';

    function save(){
      vm.locationList=LocationService.locationList;
      vm.key = LocationService.generateKey();
      

      doc['locations'][vm.key]={
                id:vm.key,
                code:vm.code,
                label:vm.name,
                quota:0,
                children:{}
              };
      //console.log(doc);         
      newDoc = _.merge(vm.locationList, doc);

      LocationService.save(newDoc);

      //log
      console.log('New County Added', vm.key, newDoc);
    }
  }
}());

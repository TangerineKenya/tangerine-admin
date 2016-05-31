(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:NewSubcountyCtrl
   *
   * @description 3BBjAHC5
   *
   */
  angular
    .module('location')
    .controller('NewSubcountyCtrl', NewSubcountyCtrl);

  NewSubcountyCtrl.$inject = ['LocationService','$q','$stateParams'];

  function NewSubcountyCtrl(LocationService,$q,$stateParams) {
    var vm = this;
    vm.save = save;
    vm.name = '';
    vm.code ='';
    vm.countyID=$stateParams.id;
    //vm.countyName=$stateParams.name;
    vm.locationList={};
    vm.key = '';

   ////////////////////////////////////////
   function save(){
      vm.locationList=LocationService.locationList;
      var doc ={
        children:{
              88889999:{
                id:'88889999',
                label:vm.name,
                code:vm.code,
                quota:0,
                children: {}
              }
            }
      };
      //get county object
      var path = 'locations.'+vm.countyID; 
      var county = _.get(vm.locationList, path);
      //merge county object with new child object
      var newDoc = _.merge(county, doc);
      //merge new county object with location list object & save
      var locList = _.merge(vm.locationList,newDoc);
      LocationService.save(locList);

      console.log('Subcounty Added',locList);
   }
  }
}());

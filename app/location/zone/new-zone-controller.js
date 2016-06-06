(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:NewZoneCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('NewZoneCtrl', NewZoneCtrl);

  NewZoneCtrl.$inject = ['LocationService','$stateParams'];

  function NewZoneCtrl(LocationService,$stateParams) {
    var vm = this;
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.save = save;
    vm.code = '';
    vm.name = '';
    vm.countyName = '';
    vm.subName = '';

    ////////////////////////////////////
    function activate(){

    }
    //get county & sub county details
    function getDetails(){

    }

    function save(){
      //create new sub doc
      var doc ={
        children:{
              48889949:{
                id:vm.key,
                label:vm.name,
                code:vm.code,
                quota:0,
                children: {}
              }
            }
      };
      //get location list
      vm.locationList=LocationService.locationList;
      var path = 'locations.'+vm.countyId+'.children.'+vm.subId; 

      //get & merge to sub county object
      var subcounty = _.get(vm.locationList,path);
      var newDoc = _.merge(subcounty,doc);
      //merge to location list
      var locList = _.merge(vm.locationList,newDoc);
      //updated location list
      LocationService.save(locList);

      console.log('Zone Saved',locList);
    }
  }
}());

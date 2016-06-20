(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:NewSchoolCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('NewSchoolCtrl', NewSchoolCtrl);

  NewSchoolCtrl.$inject = ['LocationService','$stateParams'];

  function NewSchoolCtrl(LocationService,$stateParams) {
    var vm = this;
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.zoneId = $stateParams.zone;
    vm.save = save;
    vm.name = '';
    vm.knec = '';
    vm.tusome = '';
    vm.province = '';
    vm.division = '';
    vm.address = '';
    vm.tsc = '';
    vm.code = '';
    vm.key = '';

    ////////////////////////////////////////
    function activate(){

    }

    function getDetails(){

    }

    function save(){
      vm.key = LocationService.generateKey();
      var doc ={};
      doc[vm.key]={
                id:vm.key,
                label:vm.name,
                code:vm.code,
                division:vm.division,
                province:vm.province,
                knecCode:vm.knec,
                tsc:vm.tsc,
                tusome:vm.tusome,
                address:vm.address
              };

      vm.locationList =  LocationService.locationList;

      var path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.children';

      var schools = _.get(vm.locationList,path);
      //merge new school with schools object
      var newDoc = _.merge(schools,doc);

      //merge new schools object to location list & save
      var locList = _.merge(vm.locationList,newDoc);
      LocationService.save(locList);

      console.log('School',doc);
    }

   
  }
}());

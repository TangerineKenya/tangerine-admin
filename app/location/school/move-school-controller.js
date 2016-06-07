(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:MoveSchoolCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('MoveSchoolCtrl', MoveSchoolCtrl);
  
  MoveSchoolCtrl.$inject = ['LocationService', '$q', '$stateParams'];

   function MoveSchoolCtrl(LocationService, $q, $stateParams) {
    var vm = this;
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.zoneId = $stateParams.zone;
    vm.schoolId = $stateParams.school;
    vm.school = {};
    vm.counties = {};
    vm.subcounties ={};
    vm.zones = {};
    vm.move =  move;
    vm.getSubcounties = getSubcounties;
    vm.getZones  = getZones;

    activate();
    /////////////////////////////////////////////////
    function activate(){
      var promises = [getSchool(), getCounties(), getSubcounties(), getZones()];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Initialization completed');
      });
    }

    function getSchool(){
      vm.locationList =  LocationService.locationList;

      vm.school = _.get(vm.locationList, 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.children.'+vm.schoolId);
      //console.log('Details', vm.school);
      return vm.school;
    }

    function getCounties(){
      vm.counties =  LocationService.locationList.locations;
    }

    function getSubcounties(){
      vm.locationList =  LocationService.locationList;
      vm.subcounties = _.get(vm.locationList, 'locations.'+vm.countyId+'.children.');
    }

    function getZones(){
      vm.locationList =  LocationService.locationList;
      vm.zones = _.get(vm.locationList, 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.');
    }

    function move() {
      var doc = {};
      doc[vm.schoolId]={
        id:vm.school.id,
        label:vm.school.label,
        code:vm.school.code,
        division:vm.school.division,
        province:vm.school.province,
        knecCode:vm.school.knecCode,
        tsc:vm.school.tsc,
        tusome:vm.school.tusome,
        address:vm.school.address
      };
      vm.locationList =  LocationService.locationList;

      var path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.children';

      var schools = _.get(vm.locationList,path);
      //merge new school with schools object
      var newDoc = _.merge(schools,doc);

      //merge new schools object to location list & save
      var locList = _.merge(vm.locationList,newDoc);
      LocationService.save(locList);

      console.log('School Moved',locList);
    }
   }
}());

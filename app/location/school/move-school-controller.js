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
    vm.county ={};
    vm.subcounty={};
    vm.zone = {};
    vm.getSubcounties = getSubcounties;
    vm.getZones  = getZones;


    activate();
    /////////////////////////////////////////////////
    function activate(){
      var promises = [getSchool(), getCounties()];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Initialization completed');
      });
    }

    function getSchool(){
      vm.locationList =  LocationService.locationList;
      vm.school = _.get(vm.locationList, 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.children.'+vm.schoolId);
      //vm.county = 
      return vm.school;
    }

    function getCounties(){
      vm.counties =  LocationService.locationList.locations;

      return vm.counties;
    }

    function getSubcounties(){
      //console.log('Sub-County',vm.subcounties);
      vm.subcounties = vm.county.children;
      return vm.subcounties;
    }

    function getSubcounty(){

    }

    function getZones(){
      vm.zones = vm.subcounty.children;
      return vm.zones;
    }

    function getZone(){

    }

    function move() {
      var doc = {};
      //school object
      doc[vm.schoolId]={
        id:vm.schoolId,
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

      //remove school from orignal path
      vm.locationList['locations'][vm.countyId]['children'][vm.subId]['children'][vm.zoneId]['children'] = _.omit(vm.locationList['locations'][vm.countyId]['children'][vm.subId]['children'][vm.zoneId]['children'],vm.schoolId);
      //insert to new path
      vm.locationList['locations'][vm.county.id]['children'][vm.subcounty.id]['children'][vm.zone.id]['children'] = _.merge(vm.locationList['locations'][vm.county.id]['children'][vm.subcounty.id]['children'][vm.zone.id]['children'],doc);
      //save
      LocationService.save(vm.locationList);

      //getSchool();
      console.log('New List',vm.locationList);
    }
   }
}());

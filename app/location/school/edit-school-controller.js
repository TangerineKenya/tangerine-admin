(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:EditSchoolCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('EditSchoolCtrl', EditSchoolCtrl);

  EditSchoolCtrl.$inject = ['LocationService','$stateParams','$q'];

  function EditSchoolCtrl(LocationService,$stateParams,$q) {
    var vm = this;
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.zoneId = $stateParams.zone;
    vm.schoolId = $stateParams.school;
    vm.school = {};
    vm.save = save;

    activate();

    /////////////////////////////////////////////////////////

    function activate(){
      var promises = [getSchool()];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Load School Details');
      });
    }

    function getSchool(){
      vm.locationList =  LocationService.locationList;

      var path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.children.'+vm.schoolId;

      vm.school = _.get(vm.locationList,path);

      //console.log('School Object',vm.school);

      return vm.school;
    }

    function save(){
      
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

      var schools = _.get(vm.locationList,path)
      //merge new school with schools object
      var newDoc = _.merge(schools,doc);

      //merge new schools object to location list & save
      var locList = _.merge(vm.locationList,newDoc);
      LocationService.save(locList);
      
      console.log('School Updated',locList);
    }
  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:EditZoneCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('EditZoneCtrl', EditZoneCtrl);

  EditZoneCtrl.$inject = ['LocationService', '$stateParams', '$q','$location', '$rootScope'];

  function EditZoneCtrl(LocationService, $stateParams, $q,$location, $rootScope) {
    var vm = this;
    var path = '';
    var doc = {};
    vm.countyId = $stateParams.county;
    vm.subId = $stateParams.subcounty;
    vm.zoneId = $stateParams.zone;
    vm.name = '';
    vm.save = save;
    vm.zone = {};

    activate();

    ///////////////////////////////////////////////////
    function activate(){
      var promises = [getZone()]; //[getMessageCount(), getSchools(), ];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Initialization complete',vm.zone);
      });
    }

    function getZone(){
      vm.locationList = LocationService.locationList;
      path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId;

      vm.zone = _.get(vm.locationList, path);

      return vm.zone;
    }

    function save(){
      //update zone doc

      if($rootScope.group=='tayari'){
        doc[vm.zone.id] = {
          id:vm.zone.id,
          label:vm.zone.name,
          code:vm.zone.code,
          educationQuota: vm.zone.educationQuota,
          healthQuota: vm.zone.healthQuota,
          children: vm.zone.children
        }
      }
      else{
        //tusome zone object
        doc[vm.zone.id] = {
          id:vm.zone.id,
          label:vm.zone.name,
          code:vm.zone.code,
          quota:vm.zone.quota,
          teachers:vm.zone.teachers
        }
      }
      /**/
      

      vm.locationList = LocationService.locationList;
      path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children';
      
      var zones = _.get(vm.locationList,path);
      //merge zone object
      var newDoc = _.merge(zones,doc);

      //merge new schools object to location list & save
      //var locList = _.merge(vm.locationList,newDoc);
      //LocationService.save(locList);
      var locList =  _.set(vm.locationList, path, newDoc);

      LocationService.save(locList);
      
      vm.locationList = LocationService.getLocations();
      console.log('Zone Updated', vm.locationList);

      //redirect
      
    }
  }
}());

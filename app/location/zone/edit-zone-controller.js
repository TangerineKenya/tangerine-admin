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

  EditZoneCtrl.$inject = ['LocationService', '$stateParams', '$q'];

  function EditZoneCtrl(LocationService, $stateParams, $q) {
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
      doc[vm.zone.id] = {
        id:vm.zone.id,
        label:vm.zone.name,
        code:vm.zone.code,
        quota:vm.zone.quota,
        teachers:vm.zone.teachers
      }

      vm.locationList = LocationService.locationList;
      path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children';
      
      var zones = _.get(vm.locationList,path);
      //merge zone object
      var newDoc = _.merge(zones,doc);

      //merge new schools object to location list & save
      var locList = _.merge(vm.locationList,newDoc);
      LocationService.save(locList);
      //doc =  _.set(vm.locationList, path, vm.name);

      //LocationService.save(doc);
      
      console.log('Zone Updated', locList);
    }
  }
}());

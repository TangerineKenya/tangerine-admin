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
    vm.quota = 0;
    
    activate();

    ///////////////////////////////////////////////////
    function activate(){
      var promises = [getDetails(), getZone()]; //[getMessageCount(), getSchools(), ];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Initialization complete');
      });
    }

    function getZone(){
      vm.locationList = LocationService.locationList;
      path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId;

      vm.zone = _.get(vm.locationList, path);

      return vm.zone;
    }

    function getDetails(){
      //get county & sub county details
      vm.locationList = LocationService.locationList;
      path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.label';
    vm.name =_.get(vm.locationList, path);

      console.log('Zone Details', vm.name);
    }

    function save(){
      vm.locationList = LocationService.locationList;
      path = 'locations.'+vm.countyId+'.children.'+vm.subId+'.children.'+vm.zoneId+'.label';
     
      doc =  _.set(vm.locationList, path, vm.name);

      LocationService.save(doc);
      
      console.log('Zone Updated', vm.name, doc);
    }
  }
}());

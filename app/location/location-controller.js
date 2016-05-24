(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:LocationCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('LocationCtrl', LocationCtrl);
    LocationCtrl.$inject = ['DataService','$q'];
  function LocationCtrl(DataService,$q) {
    var vm = this;
    //vm.ctrlName = 'LocationCtrl';
    vm.locationList={};
    
    activate();

    /**
     * Activate the Locations Controller
     */
    function activate() {
      var promises = [getLocations()]; //[getMessageCount(), getSchools(), ];
      vm.p = promises;
      return $q.all(promises).then(function() {
         console.log('Everything has been loaded');
      });
    }

    function getLocations(){
      return DataService.prod.get('location-list')
        .then(success)
        .catch(fail);

        function success(response){
          vm.locationList=response;
          return vm.locationList;
        }
        function fail(error){
          console.log(error);
        }
    }
  }
}());

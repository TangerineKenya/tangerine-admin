(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name location.service:Location
   *
   * @description
   *
   */
  angular
    .module('location')
    .service('LocationService', LocationService);
  
  LocationService.$inject = ['DataService','$q'];
  function LocationService(DataService,$q) {
    var service = {
      init: init,
      locationList: {},
      getLocations: getLocations
    };
    
    service.init();

    return service;
    
    ///////////////////////////////////////////////
    function init(){
      service.locationList = DataService.prod.get('location-list')
        .then(success)
        .catch(fail);

      function success(response){
        console.log("Location List Returned:", response);
        service.locationList=response;
        return response;
      }
      function fail(error){
        console.log(error);
        return {};
      }
    }

    function getLocations(){
      return service.locationList;
    }
  }
}());

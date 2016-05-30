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
      getLocations: getLocations,
      generateKey:generateKey,
      find:find,
      save:save,
      remove: remove
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
    //return location object
    function getLocations(){
      return service.locationList;
    }
    //search list
    function find(key)
    {
       
    }
    //save location object
    function save(obj){
      DataService.prod.put(obj)
        .then(success)
        .catch(fail);

        function success(response){
          console.log('Location List Updated');
          //reload location list
          service.getLocations();
        }

        function fail(error){
          console.log(error);
        }
    }
    //delete
    function remove(){

    }
    //generate key
    function generateKey(){

    }
    //update quotas
    function updateQuota(){

    }
    //validate entry
    function validate(){

    }
  }
}());

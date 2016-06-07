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

      function success(response) {
        console.log("Location List Returned:", response);
        service.locationList=response;
        return response;
      }
      function fail(error) {
        console.log(error);
        return {};
      }
    }
    //return location object
    function getLocations() {
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

        function fail(error) {
          console.log(error);
        }
    }
    //delete
    function remove(){

    }
    //generate key
    function generateKey() {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      /*Length of the Random String*/
      var string_length = 8;
      var randomstring = '';
       
      for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
       
      return randomstring;
    }

    function getCounty(countyId){

    }

    function getSubcounty(countyId,subcountyId){

    }

    function getZone(countyId,subcountyId,zoneId){

    }

    function getSchool(countyId,subcountyId,zoneId,schoolId){

    }

    //update quotas
    function updateQuota(){

    }
    //validate entry
    function validate(){

    }
  }
}());

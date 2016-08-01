(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name data.service:Data
   *
   * @description
   *
   */
  angular
    .module('core.data')
    .service('DataService', DataService);
  
  DataService.$inject = ['pouchDB','$http'];
  
  function DataService(pouchDB,$http) {
    var service = {
      db: null, 
      remote: null,
      init: init
    };

    var config = {};

    getSettings('tayari');

    service.init();
    
    return service;

    function init(){
      
      service.prod = pouchDB('http://localhost:5984/group-tayari_test');
     
      service.prod.login('admin', 'admin', function (err, resp){
        if(err){
          if (err.name === 'unauthorized') {
            console.log('name or password incorrect');
          } else {
            console.log('Connected',service.prod.info());
          }
        }
      });
      //service.local = new pouchDB('LocalDB');
      /*service.local = pouchDB('http://localhost:5984/group-national_tablet_program');
      service.local.login('admin', 'admin', function (err, resp){
          if(err){
            if (err.name === 'unauthorized') {
              console.log('name or password incorrect');
            } else {
              console.log('cosmic rays, a meteor, etc.');
            }
          }
      });*/
    }
    function getSettings(group){
      var configJson = 'assets/settings.json';
      $http.get(configJson)
        .success(success)
        .error(fail);
        
      function success(response){
        config = response.settings[group].prod;
        console.log('Settings',config);
      }

      function fail(error){
        console.log(error);
      }
    }
  }
}());

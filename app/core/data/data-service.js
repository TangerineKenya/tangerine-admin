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
  
  DataService.$inject = ['pouchDB','$rootScope', '$http'];
  
  function DataService(pouchDB, $rootScope, $http) {
    var service = {
      db: null, 
      remote: null,
      init: init
    };

    service.init();
    
    return service;

    function init(){

      var db = $rootScope.dbSettings;
      var config = {};

      if($rootScope.group=='default'){
        config = db.default;
      }
      else{
        config = db[$rootScope.group].prod;
      }

      service.prod = pouchDB(config.db);
     
      service.prod.login(config.user, config.password, function (err, resp){
        if(err){
          if (err.name === 'unauthorized') {
            console.log('name or password incorrect');
          } else {
            console.log('Connected');
          }
        }
      });
    }
  }
}());

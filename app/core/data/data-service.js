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
  
  DataService.$inject = ['pouchDB','$rootScope', '$location'];
  
  function DataService(pouchDB, $rootScope, $location) {
 
    var service = {
      db: null, 
      remote: null,
      init: init,
    };

    service.init();
    
    return service;

    function init(){
      var config = {};

      $rootScope.$watch('group', function () {
        
        if($rootScope.group=='default'){
          config = {
                      "db": "http://localhost:5984/group-national_tablet_program_test",
                      "user":"admin",
                      "password":"admin"
                    };
        }
        else if($rootScope.group=='tayari'){
          config = {
                      "db": "http://localhost:5984/group-tayari",
                      "user":"admin",
                      "password":"admin"
                    };
        }
        else {
          config = {
                      "db": "http://localhost:5984/group-national_tablet_program_test",
                      "user":"admin",
                      "password":"admin"
                    };
        }

        //console.log('group', $rootScope.group);

        service.prod = pouchDB(config.db);
       
        service.prod.login(config.user, config.password, function (err, resp){
          if(err){
            if (err.name === 'unauthorized') {
              console.log('name or password incorrect');
            } else {
              console.log(err);
            }
          }
          else{
            console.log('Connected');
          }
        });
      }, true);
    }
 
    

    //data preprocessor - pre-process assessments data by user, month & year & push to db

  }
}());

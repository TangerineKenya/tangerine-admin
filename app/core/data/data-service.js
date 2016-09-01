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
        
        config = {
                      "db": "http://tayari.tangerinecentral.org/db/group-tayari",
                      "user":"jkisioh",
                      "password":"k1$10h1984"
                  };
        /*if($rootScope.group=='default'){
          config = {
                      "db": "http://localhost:5984/group-tayari",
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
                      "db": "http://localhost:5984/group-tayari_test",
                      "user":"admin",
                      "password":"admin"
                    };
        }*/

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

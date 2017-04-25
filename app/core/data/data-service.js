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
  
  DataService.$inject = ['pouchDB','$rootScope', '$location', '$http'];
  
  function DataService(pouchDB, $rootScope, $location, $http) {
 
    var service = {
      db: null, 
      remote: null,
      init: init,
      settings: {}
    };

    service.init();
    
    return service;

    function init(){
      var config = {};

      getSettings();
      
      config = {
                "db": "http://localhost/group-national_tablet_program",
                "user":"admin",
                "password":"admin"
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
              $location.path('/');
            } else {
              console.log(err);
              $location.path('/');
            }
          }
          else{
            console.log('Data service init complete');
          }
        });
    }
    
    //get settings json file
    function getSettings()
    {
      return $http.get('assets/settings.json')
              .then(success)
              .catch(error);

        function success(resp){
          service.settings = resp;
          return resp;
        }
        function error(error){
          toastr.error('Could not find settings file.');
        }
    }
    //data preprocessor - pre-process assessments data by user, month & year & push to db
  }
}());

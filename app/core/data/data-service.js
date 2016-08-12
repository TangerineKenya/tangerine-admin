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
      login: login,
      getUser: getUser,
      user: {}
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
                      "db": "http://localhost:5984/group-tayari_test",
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

        console.log('group', $rootScope.group);

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
      }, true);
    }
 
    function login(user, password){
      //console.log('logging in..');
      service.prod.login(user, password)
        .then(success)
        .catch(fail);

        function success(response){
          //set session on successful authentication
          //console.log(response);
          if(response.ok==true){
            $rootScope.loggedIn = true;
            getUser(user);
            //console.log('User', $rootScope.currentUser);
            $location.path('app');
          }
        }

        function fail(error){
          ///return error;
          console.log('Authentication error: ', error);
          $location.path('/');
        }
    }

    function getUser(user){      
      var doc = 'user-'+user;
      return DataService.prod.get(doc)
        .then(success)
        .catch(fail);

        function success(response){
          service.user = response;
          $rootScope.currentUser= response;
        }

        function fail(error){
          console.log('User cannot be found', error);
        }
    }

    //data preprocessor - pre-process assessments data by user, month & year & push to db

  }
}());

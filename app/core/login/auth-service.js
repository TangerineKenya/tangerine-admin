(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name core.login.service:Auth
   *
   * @description
   *
   */
  angular
    .module('core.login')
    .service('AuthService', AuthService);


  AuthService.$inject= ['DataService','$location','$rootScope'];
    
  function AuthService(DataService, $location, $rootScope) {
    var vm = this;
    vm.login = login;
    vm.user = {};

    ///////////
 
    function login(user, password){
      DataService.prod.login(user, password)
        .then(success)
        .catch(fail);

        function success(response){
          //set session on successful authentication
          //return response;
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
          vm.user = response;
          $rootScope.currentUser= response;
        }

        function fail(error){
          console.log('User cannot be found', error);
        }
    }
  }
}());

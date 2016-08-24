(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name core.login.controller:LoginCtrl
   *
   * @description
   *
   */
  angular
    .module('core.login')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['DataService','$rootScope', '$location'];

  function LoginCtrl(DataService,$rootScope, $location) {
    var vm = this;
    vm.login = login;
    vm.user = {};
    vm.username;
    vm.password;
    vm.group = 'tusome';
    vm.selectGroup = selectGroup;

    
    init();
    /////////////////////////////////////
    
    function init(){
      $rootScope.loggedIn = false;
      /*DataService.prod.logout(function (err, response) {
        if (err) {
          // network error
        }
      });*/
    }

    function login(){
      DataService.prod.login(vm.username, vm.password)
        .then(success)
        .catch(fail);

        function success(response){
          if(response.ok==true){
            $rootScope.loggedIn = true;
            $rootScope.currentUser = response;
            $rootScope.group = vm.group;
            //redirect 
            $rootScope.$apply(function() {
              $location.path("app");
            });          
            console.log('Login successful', $rootScope.currentUser);
          }
        }

        function fail(error){
          ///return error;
          $rootScope.loggedIn = false;
          $location.path('/');
          console.log('Authentication error: ', error);
        }
    }

    function selectGroup(){
      $rootScope.group = vm.group;
      //console.log('Selected', $rootScope.group);
    }

    function getUserDetails(){
      return DataService.prod.getUser(vm.username);
    }

    function logout(){
      
    }
  }
}());

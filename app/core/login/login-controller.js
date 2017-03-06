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

  LoginCtrl.$inject = ['DataService','$rootScope', '$location','$cookies'];

  function LoginCtrl(DataService,$rootScope, $location, $cookies) {
    var vm = this;
    vm.login = login;
    vm.user = {};
    vm.username;
    vm.password;
    vm.group = 'tayari';
    vm.selectGroup = selectGroup;

    
    init();
    /////////////////////////////////////
    
    function init(){
      $rootScope.loggedIn = false;
      $cookies.put('loggedIn', false);
      $cookies.remove('currentUser');
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
            $cookies.put('loggedIn', true);
            $rootScope.currentUser = response;
            $cookies.putObject('currentUser', response);
            $rootScope.group = vm.group;
            //redirect 
            $rootScope.$apply(function() {
              $location.path("app/dashboard");
            });          
            toastr.info('Login successful');
          }
        }

        function fail(error){
          ///return error;
          $rootScope.loggedIn = false;
          $cookies.put('loggedIn', false);
          $location.path('/');
          //console.log('Authentication error: ', error);
          toastr.error('Username or password is incorrect');
        }
    }

    function selectGroup(){
      $rootScope.group = vm.group;
      //console.log('Selected', $rootScope.group);
    }

    function getUserDetails(){
      //return DataService.prod.getUser(vm.username);
    }

    function logout(){
      
    }
  }
}());

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

  LoginCtrl.$inject = ['AuthService','$rootScope'];

  function LoginCtrl(AuthService,$rootScope) {
    var vm = this;
    vm.login = login;
    vm.user = {};
    vm.username;
    vm.password;
    vm.group = 'Tusome';
    vm.selectGroup = selectGroup;

    ////////////////////////

    function login(){
      AuthService.login(vm.username, vm.password);

      $rootScope.group = vm.group;
    }

    function selectGroup(){
      $rootScope.group = vm.group;
      //console.log('Selected', $rootScope.group);
    }
  }
}());

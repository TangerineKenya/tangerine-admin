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

  LoginCtrl.$inject = ['AuthService'];

  function LoginCtrl(AuthService) {
    var vm = this;
    vm.login = login;
    vm.user = {};
    vm.username;
    vm.password;

    ////////////////////////

    function login(){
      AuthService.login(vm.username, vm.password);
    }
  }
}());

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

  function LoginCtrl() {
    var vm = this;
    vm.ctrlName = 'LoginCtrl';
  }
}());

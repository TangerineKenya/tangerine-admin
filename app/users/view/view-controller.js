(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name users.view.controller:ViewCtrl
   *
   * @description
   *
   */
  angular
    .module('users')
    .controller('ViewCtrl', ViewCtrl);

  function ViewCtrl() {
    var vm = this;
    vm.ctrlName = 'ViewCtrl';
  }
}());

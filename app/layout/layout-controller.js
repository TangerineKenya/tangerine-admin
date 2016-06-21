(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name layout.controller:LayoutCtrl
   *
   * @description
   *
   */
  angular
    .module('layout')
    .controller('LayoutCtrl', LayoutCtrl);

  function LayoutCtrl() {
    var vm = this;
    vm.ctrlName = 'LayoutCtrl';
  }
}());

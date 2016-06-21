(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name layout.sidebar.controller:SidebarCtrl
   *
   * @description
   *
   */
  angular
    .module('layout.sidebar')
    .controller('SidebarCtrl', SidebarCtrl);

  function SidebarCtrl() {
    var vm = this;
    vm.ctrlName = 'SidebarCtrl';
  }
}());

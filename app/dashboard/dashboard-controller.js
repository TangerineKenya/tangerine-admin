(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name dashboard.controller:DashboardCtrl
   *
   * @description
   *
   */
  angular
    .module('dashboard')
    .controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl() {
    var vm = this;
    vm.ctrlName = 'DashboardCtrl';
  }
}());

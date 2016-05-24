(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name data.controller:DataCtrl
   *
   * @description
   *
   */
  angular
    .module('data')
    .controller('DataCtrl', DataCtrl);

  function DataCtrl() {
    var vm = this;
    vm.ctrlName = 'DataCtrl';
  }
}());

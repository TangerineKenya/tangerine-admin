(function () {
  'use strict';

  /* @ngdoc object
   * @name tangerineAdmin
   * @description
   *
   */
  angular
    .module('tangerineAdmin', [
      'ngAria',
      'ui.router',
      'ui.bootstrap',
      'ui.tree',
      'home',
      'location',
      'data',
      'dashboard',
      'layout'
    ]);
}());

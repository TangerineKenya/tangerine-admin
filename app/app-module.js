(function () {
  'use strict';

  /* @ngdoc object
   * @name tangerineAdmin
   * @description
   *
   */
  angular
    .module('app', [
      'ngCookies',
      'ngAnimate',
      'ngRoute',
      'ngSanitize',
      'ngAria',
      'ngplus',
      'ngStorage',
      'ui.router',
      'ui.bootstrap',
      'ui.tree',
      'location',
      'preloader',
      'layout',
      'core.colors',
      'core.exception',
      'core.logger',
      'core.router',
      'core.settings',
      'core.translate',
      'core.utils',
      'core.data',
      'core.login',
      'users',
      'assessment',
      'dashboard'
    ]);
}());

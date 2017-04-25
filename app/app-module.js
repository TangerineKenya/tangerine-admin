(function () {
  'use strict';

  /* @ngdoc object
   * @name app
   * @description
   *
   */
  angular
    .module('app', [
      'ngCookies',
      'ngAnimate',
      'ngRoute',
      'ngSanitize',
      'ngCsv',
      'ngAria',
      'ngplus',
      //'nodemailer',
      'ngStorage',
      'ui.router',
      'ui.bootstrap',
      'ui.tree',
      'location',
      'emailmanager',
      'preloader',
      //'cfp.loadingBar',
      'layout',
      'core.colors',
      'core.exception',
      'core.logger',
      'core.router',
      'core.settings',
      'import',
      'csvexport',
      'core.translate',
      'core.utils',
      'core.data',
      'core.login',
      'users',
      'assessment',
      'dashboard'
    ]);
}());

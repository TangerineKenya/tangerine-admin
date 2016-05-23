(function () {
  'use strict';

  angular
    .module('tangerineAdmin')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());

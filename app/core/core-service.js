(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name core.service:Core
   *
   * @description
   *
   */
  angular
    .module('core')
    .service('CoreService', CoreService);

  CoreService.$inject = ['DataService'];

  function CoreService(DataService) {
    
  }
}());

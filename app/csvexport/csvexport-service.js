(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name csvexport.service:Csvexport
   *
   * @description
   *
   */
  angular
    .module('csvexport')
    .service('CsvexportService', CsvexportService);

  CsvexportService.$inject = ['DataService', '$rootScope'];

  function CsvexportService(DataService, $rootScope) {
    
    var service = {
      init: init,
      workflows: {},
      getWorkflows: getWorkflows
    };

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
      
    }

    function getWorkflows(){
      
    }

    
  }
}());

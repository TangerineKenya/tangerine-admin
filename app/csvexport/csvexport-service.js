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

  CsvexportService.$inject = ['DataService', '$rootScope','$http', '$window'];

  function CsvexportService(DataService, $rootScope, $http, $window) {
    
    var service = {
      init: init,
      workflows: {},
      tutorTrips: {},
      trip: {},
      getWorkflows: getWorkflows,
      //getTutorTrips: getTutorTrips,
      //getTrips: getTrips,
      //getTrip: getTrip,
      //getSpritRotut: getSpritRotut,
      getCsv: generateCsv
    };

    var settings = {};

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
      //data
      
      //console.log(settings);
      //get
      service.workflows = DataService.prod.query('reporting/instruments')
        .then(success)
        .catch(fail);

      function success(response){
        service.workflows = response;
        //console.log('Workflow', response);
        return response;
      }
      function fail(err){
        //console.log('Could not load workflows', err);
        return {};
      }
    }
    //get workflows
    function getWorkflows(){
      return service.workflows;
    }
    //send request to brockman
    function generateCsv(workflow, month, year){     
      $window.location = 'http://localhost/brockman/workflow/group-national_tablet_program/'+workflow+'/'+year+'/'+month;
    }
  }
}());

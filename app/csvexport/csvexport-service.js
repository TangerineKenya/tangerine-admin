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
      tutorTrips: {},
      trip: {},
      getWorkflows: getWorkflows,
      getTutorTrips: getTutorTrips,
      getTrips: getTrips,
      getTrip: getTrip,
      getSpritRotut: getSpritRotut
    };

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
      service.workflows = DataService.prod.query('ojai/byCollection', {
        key: 'workflow',
        reduce: false
      })
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
    //get data from tutor trip view
    function getTutorTrips(year, month, workflowId){
      var tutorKey = 'year'+year+'month'+month+'workflowId'+workflowId;
      return DataService.prod.query('ojai/tutorTrips', {
        key: tutorKey,
        reduce: false
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.tutorTrips = response;
        return response;
      }
      function fail(err){
        return {};
      }
    }
    function getTrips(){
      return service.tutorTrips;
    }
    //get data from spritRotut view
    function getSpritRotut(tripId){
      return DataService.prod.query('ojai/spritRotut', {
        key: tripId,
        group: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.trip = response;
        console.log('t', response);
        return response;
      }
      function fail(err){
        return {};
      }
    }
    function getTrip(){
      return service.trip;
    }
    function generateCsv(outputData){

    }
  }
}());

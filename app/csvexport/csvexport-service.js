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

  CsvexportService.$inject = ['DataService', '$rootScope','$http'];

  function CsvexportService(DataService, $rootScope, $http) {
    
    var service = {
      init: init,
      workflows: {},
      tutorTrips: {},
      trip: {},
      getWorkflows: getWorkflows,
      getTutorTrips: getTutorTrips,
      getTrips: getTrips,
      getTrip: getTrip,
      getSpritRotut: getSpritRotut,
      getCsv: generateCsv
    };

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
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
    //send request to brockman
    function generateCsv(link){
      var request = {
                      method: 'GET',
                      url: link,
                      headers: {
                            'Content-Type': 'application/html',
                            "Access-Control-Allow-Origin": "*",
                            'Accept': 'application/html'
                          }
                    }
                            
        //send
        $http(request)
            .then(success)
            .catch(fail);

        function success(resp){
          toastr.info('CSV Generated..');
        }
        function fail(err){
          toastr.error('CSV Failed to generate..');
        }
    }
  }
}());

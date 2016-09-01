(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name assessment.service:assessmentService
   *
   * @description
   *
   */
  angular
    .module('assessment')
    .service('AssessmentService', AssessmentService);

  AssessmentService.$inject = ['DataService', '$rootScope'];

  function AssessmentService(DataService, $rootScope) {
    var service = {
      init: init,
      assessments: {},
      getTrips: getTrips,
      getTrip: getTrip,
      trips: {}
    };

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
      
    }

    function getTrips(userKey)
    {
      return DataService.prod.query('reporting/userTripsByMonth', {
        key: userKey,
        reduce: false
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.trips = response;
        return response;
      }
      function fail(err){
        console.log('Could not load trips', err);
        return {};
      }
    }

    function getTrip(trip){
      return DataService.prod.query('t/tripsAndUsers', {
        key: trip,
        reduce: false,
        include_docs : true
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.trips = response;
        return response;
      }
      function fail(err){
        console.log('Could not load trip', err);
        return {};
      }
    }
  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name feedback.service:FeedbackService
   *
   * @description
   *
   */
  angular
    .module('feedback')
    .service('FeedbackService', FeedbackService);

  FeedbackService.$inject = ['DataService']

  function FeedbackService(DataService) {
    var service ={
      init: init,
      trips: {},
      observations: {},
      getObservations: getObservations,
      getAssessment: getAssessment
    };
    
    service.init();

    return service;

    ///////////////////////////////////
    function init(){
      service.trips = DataService.prod.query('t/tutorTrips', {
        startkey: 'trip',
        reduce: false,
        include_docs: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        rtiObservations(response);
      }

      function fail(err){
        console.log('Could not load assessments', err);
      }
    }

    function rtiObservations(trip){
      _.forEach(trip.rows, function(value, key) {
          if(value.doc.assessmentName==='Tusome Worldreader Observation Tool for NTT and RTI'){
            service.observations[value.id] = value.doc;
          }
          
        });
      return service.observations;
    }
    
    function getObservations(){
      return service.observations;
    }

    function getAssessment(assessmentId){
      console.log('Assessment', assessmentId);
      return _.get(service.observations, assessmentId);
    }
  }
}());

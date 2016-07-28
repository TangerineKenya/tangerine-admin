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

  FeedbackService.$inject = ['DataService',$rootScope]

  function FeedbackService(DataService,$rootScope) {
    var service ={
      init: init,
      trips: {},
      observations: {},
      getObservations: getObservations,
      getAssessment: getAssessment,
      postAssessment: postAssessment
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
        rtiObservations(response, 'Tusome Worldreader Observation Tool for NTT and RTI');
        //console.log($rootScope.currentUser);
      }

      function fail(err){
        console.log('Could not load assessments', err);
      }
    }

    function rtiObservations(trip, assessment){
      _.forEach(trip.rows, function(value, key) {
          if(value.doc.assessmentName===assessment && value.doc.enumerator===$rootScope.currentUser.name){
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

    function postAssessment(doc){
      DataService.prod.put(doc,doc._rev)
        .then(success)
        .catch(fail);

        function success(response){
          console.log('Document Saved');
          service.init();
        }

        function fail(error) {
          console.log(error);
        }
    }
  }
}());

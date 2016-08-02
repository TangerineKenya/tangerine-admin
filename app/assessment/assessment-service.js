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

  AssessmentService.$inject = ['DataService','$rootScope']

  function AssessmentService(DataService, $rootScope) {
    var service ={
      init: init,
      trips: {},
      assessments: {},
      getAssessments: getAssessments,
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
        service.trips = response;
        //console.log('trips', response);
        getAssessmentsByName(response, 'After Observation');
        getAssessmentsByName(response, 'During Obsevation Tool - Sub-County ECD Coordinator Observation');
        //console.log('Assess', response);
      }

      function fail(err){
        console.log('Could not load assessments', err);
      }
    }

    function getAssessmentsByName(trip, assessment){
      _.forEach(trip.rows, function(value, key) {
          //if admin display all
          if($rootScope.currentUser.roles[0]==='_admin'){
            if(value.doc.assessmentName===assessment){
              service.assessments[value.id] = value.doc;
            }
          }
          else 
          {
            //display for logged in user
            if(value.doc.assessmentName===assessment && value.doc.enumerator===$rootScope.currentUser.name){
              service.assessments[value.id] = value.doc;
            }
          }
        });
      return service.assessments;
    }

    function getAssessments(){
      return service.assessments;
    }

    function getAssessment(assessmentId){
      console.log('Assessment', assessmentId);
      return _.get(service.assessments, assessmentId);
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

    function sendMail(){
      
    }

    function getTrips(){
      return service.trips;
    }
  }
}());

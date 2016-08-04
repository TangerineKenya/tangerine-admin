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

  AssessmentService.$inject = ['DataService', '$rootScope', '$http']

  function AssessmentService(DataService, $rootScope, $http) {
    var service ={
      init: init,
      trips: {},
      assessments: {},
      getAssessments: getAssessments,
      getAssessment: getAssessment,
      postAssessment: postAssessment,
      sendMail: sendMail
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
        if($rootScope.group=='tayari'){
          getAssessmentsByName(response, 'After Observation');
          getAssessmentsByName(response, 'During Obsevation Tool - Sub-County ECD Coordinator Observation');
        }
        else{//rti assessments
          getAssessmentsByName(response, 'Tusome Worldreader Observation Tool for NTT and RTI');
          //getAssessmentsByName(response, 'During Obsevation Tool - Sub-County ECD Coordinator Observation');
        }
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
            if(value.doc.assessmentName===assessment && value.doc.enumerator=='dmutuma' ){
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

    function sendMail(message){
    
      $http({
            method: 'POST',
            url: 'assets/send-mail.php',
            data: $.param(message),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(success).catch(fail)

      function success(resp){
        return resp;
      }

      function fail(err){
        console.log('Email Error', err);
      }
    }

    function exportToWord(){

    }

    function getTrips(){
      return service.trips;
    }
  }
}());

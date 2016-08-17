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

  AssessmentService.$inject = ['DataService', '$rootScope', '$http'];

  function AssessmentService(DataService, $rootScope, $http) {
    var service = {
      init: init,
      trips: {},
      assessments: {},
      getAssessments: getAssessments,
      getAssessment: getAssessment,
      postAssessment: postAssessment,
      sendMail: sendMail,
      exportToPdf: exportToPdf
    };

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
      //build design doc if dne 
      service.trips = DataService.prod.query('t/byCollection', {
        key: 'result',
        reduce: false,
        include_docs: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.trips = response;
        if($rootScope.group=='tayari'){ //
          getAssessmentsByName(response, 'Pre-Observation Tool - Sub-County ECD Coordinator observation');
          getAssessmentsByName(response, "During Obsevation Tool - Sub-County ECD Coordinator Observation");
          getAssessmentsByName(response, 'After Observation'); 
          getAssessmentsByName(response, 'Tayari Child Health Intervention Tool'); 
        }
        else{
          //tusome assessments
          //getAssessmentsByName(response, 'Tusome Worldreader Observation Tool for NTT and RTI');
        }
      }
      function fail(err){
        console.log('Could not load assessments', err);
      }
      //query design doc 
      /*service.trips = DataService.prod.query('t/tutorTrips', {
        startkey: 'trip',
        reduce: false,
        include_docs: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.trips = response;
        //console.log('trips', response);
        if($rootScope.group=='tayari'){ //
          getAssessmentsByName(response, 'Pre-Observation Tool - Sub-County ECD Coordinator observation');
          getAssessmentsByName(response, "During Obsevation Tool - Sub-County ECD Coordinator Observation");
          getAssessmentsByName(response, 'After Observation'); 
          getAssessmentsByName(response, 'Tayari Child Health Intervention Tool'); 
        }
        else{
          //tusome assessments
          //getAssessmentsByName(response, 'Tusome Worldreader Observation Tool for NTT and RTI');
        }
        //console.log('Assess', response);
      }
      function fail(err){
        console.log('Could not load assessments', err);
      }*/
    }

    function getAssessmentsByName(trip, assessment){
      _.forEach(trip.rows, function(value, key) {
          //if admin display all
          if($rootScope.currentUser.roles[0]==='_admin' && value.doc.enumerator=='dmutuma' ){  
            if(value.doc.assessmentName===assessment){ //&& value.doc.enumerator=='dmutuma' 
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

    function getCombinedAssesment(trips){
      _.foreach(trips.rows, function(value, key){
        
      });
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

    function sendMail(to,subject, message){
  
      var mailData = {
          from: $rootScope.currentUser.email,
          to: to,
          subject: subject,
          text: message,
          html: 'HTML version of the message'
      };

      //transporter.sendMail(mailData);

      console.log(mailData);
    }

    function exportToWord(){

    }

    function exportToPdf(){
      
    }

    function getTrips(){
      return service.trips;
    }
  }
}());

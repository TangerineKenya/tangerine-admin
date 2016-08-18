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
      assessments: {},
      getTrips: getTrips,
      getTrip: getTrip,
      trips: {}
    };

    service.init();

    return service;

    /////////////////////////////////// 
    function init() {
      //query design doc 
      
    }

    function getTrips(userKey)
    {
      return DataService.prod.query('reporting/userTripsByMonth', {
        key: userKey,
        reduce: true
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
    /*function getUsersAssessments(user, month, year){

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
  
    }

    function getTrips(){
      return service.trips;
    }*/
  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name feedback.view.controller:ViewCtrl
   *
   * @description
   *
   */
  angular
    .module('assessment')
    .controller('ViewCtrl', ViewCtrl);


  ViewCtrl.$inject = ['AssessmentService', 'LocationService', '$stateParams', '$q', '$http', '$location'];

  function ViewCtrl(AssessmentService, LocationService, $stateParams, $q, $http, $location) {
    var vm = this;
    vm.tripId = $stateParams.id;
    vm.assessment = {};
    vm.subtests =  {};
    vm.notes = '';
    vm.save = postComments;
    vm.email = '';
    vm.sendEmail = sendEmail;
    vm.show = false;
    vm.allowSend = allowSend;
    vm.exportToPdf = exportToPdf;

    activate();

    //////////////////////////////
    function activate(){
      var promises = [getTrip()]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         getTrip();
      });
    }

    function getTrip(){
      vm.assessment = AssessmentService.getTrip(vm.tripId).then(success).catch(fail);

      function success(resp){
        vm.assessment = resp.rows;
        console.log(vm.assessment);
      }

      function fail(err){
        console.log(err);
      }
    }

    function postComments(){
      //vm.assessment['notes'] = vm.notes;

      //console.log(vm.assessment);
      //AssessmentService.postAssessment(vm.assessment);

      activate();
      //$location.path('feedback'); 
    }

    function allowSend(){
      return vm.show;
    }

    function sendEmail(){
      /*if(vm.email){
        AssessmentService.sendMail(vm.email, '', '');
      }
      else{
         alert('Please provide an email');
      }*/
      
    }

    function exportToPdf(){
      var docDefinition = {};
        
      var assessmentDoc = {};
      var subtestDoc = {};

      _.forEach(vm.assessment, function(value, key){
          //build each assessment doc
          assessmentDoc[value.doc.assessmentName] = value.doc;

        _.forEach(value.doc.subtestData, function(val, k){
          //build sub test doc
          subtestDoc[val.name] = val.data;
        });

      });

      var rtiOfficer = assessmentDoc['During Obsevation Tool - Sub-County ECD Coordinator Observation']['enumerator'];

      var activities = {
          1: 'Language Activities',
          2: 'Maths Activities',
          3: 'Social Activities',
          4: 'Life skills Activities'
        };

      var preparedness = {
        1: 'Very well prepared',
        2: 'Prepared',
        3: 'Not prepared'
      };

      var date =  subtestDoc['Date and Time']['day']+'/'+subtestDoc['Date and Time']['month']+'/'+subtestDoc['Date and Time']['year']

      //get data for key
      var activityKey =  subtestDoc['During reading observation']['teaching_activity'];
      var prepKey = subtestDoc['During reading observation']['teacher_preparedness'];

      //get location details
      var countyId = subtestDoc['School Location']['location'][0];
      var zoneId = subtestDoc['School Location']['location'][1];
      var schoolId = subtestDoc['School Location']['location'][2];

      var county = LocationService.getCounty(countyId);

      //var zone = _.find(county.chilren, { 'id': zoneId });

      //var school = _.find(zone.chilren, { 'id': schoolId });

      console.log('Subtests', subtestDoc);

      docDefinition = {
          pageOrientation: 'landscape',
          content: [
            { text: 'Lesson Observation Brief', margin: [250, 20, 40, 20], fontSize: 15, bold: true, alignment: 'centered' },
            'County: '+county['label'],
            'Zone/Cluster: ',
            'School: ',
            'Teacher: ',
            { text: 'RTI Officer: '+rtiOfficer, margin: [0, 1, 0, 20] },
            {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*','*','*','*','*','*' ],

                body: [
                  [ 'Date', 'Activity', 'Week', 'Day','Lesson Duration','Pupils Present','Boys','Girls','Take-up Rating' ],
                  [ date, activities[activityKey], subtestDoc['Classroom Demographics']['lesson_week'], subtestDoc['Classroom Demographics']['lesson_day'],'','','','', preparedness[prepKey] ]
                ]
              }
            },
            { text: 'Qualitative Background Information', margin: [0, 20, 40, 0], fontSize: 15 },
            {
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*', '*' ],

                body: [
                  [ 'WHAT WENT WELL', 'WHAT DID NOT GO WELL', 'FEEDBACK FROM DICECE', 'FEEDBACK TO DICECE' ],
                  [ '', '', subtestDoc['Remarks after observation']['dicece_suggestion'], subtestDoc['During reading observation']['officer_feedback'] ]
                ]
              }
            },
            { text: 'Overall Observation And Recomendations', margin: [0, 20, 40, 0], fontSize: 15 },
            subtestDoc['Remarks after observation']['general_comments'],
          ]
      }
      
      // open in a new window
      pdfMake.createPdf(docDefinition).open();
    }
  }
}());

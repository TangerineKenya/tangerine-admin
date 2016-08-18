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


  ViewCtrl.$inject = ['AssessmentService','$stateParams','$q', '$http', '$location'];

  function ViewCtrl(AssessmentService, $stateParams, $q, $http, $location) {
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

    /*function getSubtests(){
      var sub = vm.assessment;
      _.forEach(sub, function(value, key) {
          //vm.subtests[value.name] = value.data;  
          console.log('Subtest', key, '-', value);        
        });
      return vm.subtests;
    }*/

    function postComments(){
      vm.assessment['notes'] = vm.notes;

      //console.log(vm.assessment);
      AssessmentService.postAssessment(vm.assessment);

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
      var comments = vm.subtests['Assessors General Comments'];
      if(vm.assessment.assessmentName==='Tayari Child Health Intervention Tool'){
        docDefinition = {
          pageOrientation: 'landscape',
          content: [
            { text: 'Tayari Child Health Intervention Brief', margin: [200, 20, 40, 20], fontSize: 15, bold: true, alignment: 'centered' },
            { text: 'RTI Officer: '+vm.assessment.enumerator.toUpperCase(), margin: [0, 10, 10, 20] },
            { text: 'Qualitative Background Information', margin: [0, 20, 40, 0], fontSize: 15 },
            {
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', '*' ],

                body: [
                  [ 'WHAT WENT WELL', 'WHAT DID NOT GO WELL', 'ACTIONAL FEEDBACK' ],
                  [ vm.subtests['Feedback session']['successful_fdbk'], vm.subtests['Feedback session']['motivational_fdbk'], vm.subtests['Feedback session']['Actional_fdbk'] ]
                ]
              }
            },
            { text: 'Overall Observation And Recomendations', margin: [0, 20, 40, 0], fontSize: 15 },
            ''+vm.notes,
          ]
        };
      }else{
        docDefinition = {
          pageOrientation: 'landscape',
          content: [
            { text: 'LESSON OBSERVATION BRIEF', margin: [240, 20, 40, 20], fontSize: 15, bold: true, alignment: 'centered' },
            '',
            'County: ',
            'Zone/Cluster: ',
            'School: ',
            'Teacher: ',
            { text: 'RTI Officer: '+vm.assessment.enumerator.toUpperCase(), margin: [0, 1, 0, 20] },
            {
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ '*', '*', '*', '*','*','*','*','*','*' ],

                body: [
                  [ 'Date', 'Activity', 'Week', 'Day','Lesson Duration','Pupils Present','Boys','Girls','Take-up Rating' ],
                  [ '', 'Value 2', 'Value 3', 'Value 4','','','','','' ]
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
                  [ comments['SCC_feedback'], comments['lsda_recmnds'], '', comments['rtio_feedback'] ]
                ]
              }
            },
            { text: 'Overall Observation And Recomendations', margin: [0, 20, 40, 0], fontSize: 15 },
            ''+vm.notes,
          ]
        };
      }

      // open the PDF in a new window
      pdfMake.createPdf(docDefinition).open();

      console.log('Done..');
    }
  }
}());

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


  ViewCtrl.$inject = ['AssessmentService', 'LocationService', '$stateParams', '$q','$window'];

  function ViewCtrl(AssessmentService, LocationService, $stateParams, $q, $window) {
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
    vm.exportToWord = exportToWord;
    var assessmentDoc = {};
    var subtestDoc = {};

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
        buildTripData(vm.assessment);
      }

      function fail(err){
        console.log(err);
      }
    }

    function buildTripData(trip){
      _.forEach(trip, function(value, key){
          //build each assessment doc
          assessmentDoc[value.doc.assessmentName] = value.doc;

        _.forEach(value.doc.subtestData, function(val, k){
          //build sub test doc
          subtestDoc[val.name] = val.data;
        });

      });
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
      if(vm.email){
        
      }
      else{
        alert('Please provide an email');
      }
      
    }

    function exportToPdf(){
      var docDefinition = {};

      //console.log(subtestDoc);
      var rtiOfficer = '';
      if(assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']!=null){
        rtiOfficer = assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']['enumerator'];
      }

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

      if(subtestDoc['Date and Time']!=null && subtestDoc['Classroom Demographics']!=null && subtestDoc['School Location']!=null && subtestDoc['Lesson observation']!=null && subtestDoc['After lesson observation']!=null){
        var date =  subtestDoc['Date and Time']['day']+'/'+subtestDoc['Date and Time']['month']+'/'+subtestDoc['Date and Time']['year']

        //get data for key
        var activityKey =  subtestDoc['Classroom Demographics']['select_subject'];
        var prepKey = subtestDoc['Lesson observation']['lessn_present'];

        var pupils = parseInt(subtestDoc['Classroom Demographics']['boys'], subtestDoc['Classroom Demographics']['girls']);

        //get location details
        var countyId = subtestDoc['School Location']['location'][0];
        var zoneId = subtestDoc['School Location']['location'][1];
        var schoolId = subtestDoc['School Location']['location'][2];

        var county = LocationService.getCounty(countyId);

        //var zone =  $filter('filter')(county.children, function (d) {return d.id === countyId;});

        //console.log('county', zone);

        //var school = _.find(zone.chilren, { 'id': schoolId });

        //console.log('Subtests', subtestDoc);

        docDefinition = {
            pageOrientation: 'landscape',
            content: [
              { text: 'Lesson Observation Brief', margin: [250, 20, 40, 20], fontSize: 15, bold: true, alignment: 'centered' },
              'County: '+county['label'],
              'Zone/Cluster: ',
              'School: ',
              'Teacher: '+subtestDoc['Lesson observation']['teacher_name'],
              { text: 'RTI Officer: '+rtiOfficer.toUpperCase(), margin: [0, 1, 0, 20] },
              {
                table: {
                  headerRows: 1,
                  widths: [ '*', '*', '*', '*','*','*','*','*','*' ],

                  body: [
                    [ 'Date', 'Activity', 'Week', 'Day','Lesson Duration','Pupils Present','Boys','Girls','Take-up Rating' ],
                    [ date, activities[activityKey], '', '',subtestDoc['Lesson observation']['lssn_duration'],pupils,subtestDoc['Classroom Demographics']['boys'],subtestDoc['Classroom Demographics']['girls'], preparedness[prepKey] ]
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
                    [ subtestDoc['Lesson observation']['tchr_did_well'], subtestDoc['Lesson observation']['tchr_not_undrsnd_well'], subtestDoc['After lesson observation']['SCC_feedback_trtmnt1'], subtestDoc['After lesson observation']['RTI_feedback_trtmnt1'] ]
                  ]
                }
              },
              { text: 'Overall Observation And Recomendations', margin: [0, 20, 40, 0], fontSize: 15 },
              subtestDoc['After lesson observation']['general_comment_trtmnt1'],
              { text: vm.notes, margin: [0, 20, 40, 0] },
            ]
        } 
        
        // open in a new window
        pdfMake.createPdf(docDefinition).open();
      }
      else{
        alert('A pdf cannot be generated for this trip.');
      }
    }

    function exportToWord(){
      
      var rtiOfficer = '';
      if(assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']!=null){
        rtiOfficer = assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']['enumerator'];
      }

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

      if(subtestDoc['Date and Time']!=null && subtestDoc['Classroom Demographics']!=null && subtestDoc['School Location']!=null && subtestDoc['Lesson observation']!=null && subtestDoc['After lesson observation']!=null){
        var date =  subtestDoc['Date and Time']['day']+'/'+subtestDoc['Date and Time']['month']+'/'+subtestDoc['Date and Time']['year']

        //get data for key
        var activityKey =  subtestDoc['Classroom Demographics']['select_subject'];
        var prepKey = subtestDoc['Lesson observation']['lessn_present'];

        var pupils = parseInt(subtestDoc['Classroom Demographics']['boys'], subtestDoc['Classroom Demographics']['girls']);

        //get location details
        var countyId = subtestDoc['School Location']['location'][0];
        var zoneId = subtestDoc['School Location']['location'][1];
        var schoolId = subtestDoc['School Location']['location'][2];

        var county = LocationService.getCounty(countyId);

        var content = '<html><title>Observations</title><body>'+
                      '<h1 align="center">Lesson Observation Brief</h1>'+
                      '<b>County:</b> '+county['label'].toUpperCase()+'<br/>'+
                      '<b>Zone/Cluster:</b> '+'<br/>'+
                      '<b>School:</b> '+'<br/>'+
                      '<b>Teacher:</b> '+subtestDoc['Lesson observation']['teacher_name']+'<br/>'+
                      '<b>RTI Officer:</b> '+rtiOfficer.toUpperCase()+'<br/>'+
                      '<br/>'+
                      '<table width="100%" border="1">'+
                      '<tr>'+
                      '<th>Date</th>'+
                      '<th>Activity</th>'+
                      '<th>Week</th>'+
                      '<th>Day</th>'+
                      '<th>Lesson<br/>Duration</th>'+
                      '<th>Pupils<br/>Present</th>'+
                      '<th>Girls</th>'+
                      '<th>Boys</th>'+
                      '<th>Take-up Rating</th>'+
                      '</tr>'+
                      '<tr>'+
                      '<td>'+date.toUpperCase()+'</td>'+
                      '<td>'+activities[activityKey]+'</td>'+
                      '<td></td>'+
                      '<td></td>'+
                      '<td>'+subtestDoc['Lesson observation']['lssn_duration']+'</td>'+
                      '<td></td>'+
                      '<td>'+subtestDoc['Classroom Demographics']['girls']+'</td>'+
                      '<td>'+subtestDoc['Classroom Demographics']['boys']+'</td>'+
                      '<td>'+preparedness[prepKey]+'</td>'+
                      '</tr>'+
                      '</table>'+'<br/>'+
                      '<br/>'+
                      '<h3>Qualitative Background Information</h3>'+
                      '<table width="100%" border="1">'+
                      '<tr>'+
                      '<th>WHAT WENT WELL</th>'+
                      '<th>WHAT DID NOT GO WELL</th>'+
                      '<th>FEEDBACK FROM DICECE</th>'+
                      '<th>FEEDBACK TO DICECE</th>'+
                      '</tr>'+
                      '<tr>'+
                      '<td>'+subtestDoc['Lesson observation']['tchr_did_well']+'</td>'+
                      '<td>'+subtestDoc['Lesson observation']['tchr_not_undrsnd_well']+'</td>'+
                      '<td>'+subtestDoc['After lesson observation']['SCC_feedback_trtmnt1']+'</td>'+
                      '<td>'+subtestDoc['After lesson observation']['RTI_feedback_trtmnt1']+'</td>'+
                      '</tr>'+
                      '</table>'+
                      '<br/>'+
                      '<h3>Overall Observation And Recommendations</h3>'+
                      ''+subtestDoc['After lesson observation']['general_comment_trtmnt1']+
                      '<br/>'+
                      ''+vm.notes+
                      '</body></html>';

        var converted = htmlDocx.asBlob(content, {orientation: 'landscape', margins: {top: 720}});
        saveAs(converted, 'trip.docx');

        console.log('Document generated');
      }
      else{
        alert('A document cannot be generated for this trip.');
      }
    }

    function exportHealthBriefToWord(){
      
    }
  }
}());

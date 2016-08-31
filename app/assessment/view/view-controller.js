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
    vm.county = {};
    vm.zone = {};
    vm.school = {};
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

        console.log(resp);
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
      //get location details
        var countyId = subtestDoc['School Location']['location'][0];
        var zoneId = subtestDoc['School Location']['location'][1];
        var schoolId = subtestDoc['School Location']['location'][2];

        vm.county = LocationService.getCounty(countyId);
        //get zone
        _.forEach(vm.county['children'], function(value, key){

          _.forEach(value.children, function(val, k){
              if(k==zoneId){
                vm.zone = val;
              }
          });
        });

        //get school
        _.forEach(vm.zone['children'], function(val, k){
              if(k==schoolId){
                vm.school = val;
              }
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

        var zone =  _.filter(county.children, { 'id': zoneId  });

        console.log('zone', zone);

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
      if(assessmentDoc['Tayari Child Health Intervention Tool']!=null){
        exportCHIToolToWord();
      }
      else{
        exportRTIToolToWord();
      }
    }

    function exportRTIToolToWord(){
      var rtiOfficer = '';
      if(assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']!=null){
        rtiOfficer = assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']['enumerator'];
      }

      if(assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation']!=null){
        rtiOfficer = assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation']['enumerator'];
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

      if(subtestDoc['Date and Time']!=null && subtestDoc['School Location']!=null){
        var date =  subtestDoc['Date and Time']['day']+'/'+subtestDoc['Date and Time']['month']+'/'+subtestDoc['Date and Time']['year']

        //get data for key
        var activityKey = '';
        var prepKey = '';
        var went_well = '';
        var went_wrong = '';
        var dicece_feedback = '';
        var feedback_to_dicece = '';
        var duration = 0;
        var comments= '';
        var teacher = '';
        var girls = 0;
        var boys = 0;
        var pupils = 0;
        var day = '';
        var week ='';
        var coach = '';

        if(subtestDoc['Classroom Demographics']!=null){
          activityKey =  subtestDoc['Classroom Demographics']['select_subject'];
          boys = subtestDoc['Classroom Demographics']['boys'];
          girls = subtestDoc['Classroom Demographics']['girls'];
          pupils = parseInt(boys)*1 + parseInt(girls)*1;
          day = subtestDoc['Classroom Demographics']['lesson_day'];
          week = subtestDoc['Classroom Demographics']['lesson_week'];
        }

        if(subtestDoc['Lesson observation']!=null){
          prepKey = subtestDoc['Lesson observation']['lessn_present'];
          went_well = subtestDoc['Lesson observation']['tchr_did_well'];
          went_wrong = subtestDoc['Lesson observation']['tchr_not_undrsnd_well'];
          duration = subtestDoc['Lesson observation']['lssn_duration'];
          teacher = subtestDoc['Lesson observation']['teacher_name'];
        }

        if(subtestDoc['During observation']!=null){
          prepKey = subtestDoc['During observation']['teacher_preparedness'];
          went_well = subtestDoc['During observation']['what_went_well'];
          went_wrong = subtestDoc['During observation']['lesson_improvement'];
          duration = subtestDoc['During observation']['lesson_duration'];
          teacher = subtestDoc['During observation']['Teacher_name'];
          //activityKey =  subtestDoc['During observation']['teaching_activity'];
          feedback_to_dicece = subtestDoc['During observation']['officer_feedback'];
          //dicece_feedback = subtestDoc['During observation']['SCC_feedback_trtmnt1'];
          coach = subtestDoc['During observation']['SCC_Coach_name'];
        }

        if(subtestDoc['After lesson observation']!=null){
          dicece_feedback = subtestDoc['After lesson observation']['SCC_feedback_trtmnt1'];
          feedback_to_dicece = subtestDoc['After lesson observation']['RTI_feedback_trtmnt1'];
          comments = subtestDoc['After lesson observation']['general_comment_trtmnt1'];
        }

        if(subtestDoc['Assessors General Comments']!=null){
          dicece_feedback = subtestDoc['Assessors General Comments']['SCC_feedback'];
          feedback_to_dicece = subtestDoc['Assessors General Comments']['rtio_feedback'];
          comments = subtestDoc['Assessors General Comments']['lsda_recmnds'];
        }

        var content = '<html><title>Observations</title><body>'+
                      '<h1 align="center">TAYARI LESSON OBSERVATION BRIEF</h1>'+
                      '<b>County:</b> '+vm.county['label'].toUpperCase()+'<br/>'+
                      '<b>Zone/Cluster:</b> '+vm.zone['label'].toUpperCase()+'<br/>'+
                      '<b>School:</b> '+vm.school['label'].toUpperCase()+'<br/>'+
                      '<b>CSO:</b> '+coach.toUpperCase()+'<br/>'+
                      '<b>Teacher:</b> '+teacher.toUpperCase()+'<br/>'+
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
                      '<td>'+week+'</td>'+
                      '<td>'+day+'</td>'+
                      '<td>'+duration+'</td>'+
                      '<td>'+pupils+'</td>'+
                      '<td>'+girls+'</td>'+
                      '<td>'+boys+'</td>'+
                      '<td>'+preparedness[prepKey]+'</td>'+
                      '</tr>'+
                      '</table>'+'<br/>'+
                      '<br/>'+
                      '<h3>Qualitative Background Information</h3>'+
                      '<table width="100%" border="1">'+
                      '<tr>'+
                      '<th>WHAT WENT WELL</th>'+
                      '<th>WHAT DID NOT GO WELL</th>'+
                      '<th>FEEDBACK FROM CSO/DICECE</th>'+
                      '<th>FEEDBACK TO CSO/DICECE</th>'+
                      '</tr>'+
                      '<tr>'+
                      '<td>'+went_well+'</td>'+
                      '<td>'+went_wrong+'</td>'+
                      '<td>'+dicece_feedback+'</td>'+
                      '<td>'+feedback_to_dicece+'</td>'+
                      '</tr>'+
                      '</table>'+
                      '<br/>'+
                      '<h3>Overall Observation And Recommendations</h3>'+
                      ''+comments+
                      '<br/>'+
                      ''+vm.notes+
                      '</body></html>';

        console.log('Document generated');

        var converted = htmlDocx.asBlob(content, {orientation: 'landscape', margins: {top: 720}});
        saveAs(converted, 'trip.docx');
      }
      else{
        alert('A document cannot be generated for this trip.');
      }
    }

    function exportCHIToolToWord(){
      //health tool export
      if(assessmentDoc['Tayari Child Health Intervention Tool']!=null){
        if(subtestDoc['Class demographics']!=null && subtestDoc['Feedback session']!=null && subtestDoc['Date and Time']!=null && subtestDoc['School Location']!=null){
          
        var rtiOfficer = '';
        if(assessmentDoc['General Information']!=null){
          rtiOfficer = assessmentDoc['General Information']['enumerator'];
        }

          var date =  subtestDoc['Date and Time']['day']+'/'+subtestDoc['Date and Time']['month']+'/'+subtestDoc['Date and Time']['year']
         

          var went_well = subtestDoc['Feedback session']['successful_fdbk'];
          var went_wrong = subtestDoc['Feedback session']['motivational_fdbk'];
          var comments = '';
          var pupils = parseInt(subtestDoc['Class demographics']['boys_pp1'])*1 + parseInt(subtestDoc['Class demographics']['boys_pp2'])*1 + parseInt(subtestDoc['Class demographics']['girls_pp1'])*1 + parseInt(subtestDoc['Class demographics']['girl_pp2'])*1; 
          
          var content = '<html><title>Observations</title><body>'+
                      '<h1 align="center">TAYARI CHILD HEALTH INTERVENTION</h1>'+
                      '<h3 align="center">Support Observation Feedback Sheet (to be completed by RTI officer/ national level TOT)</h3>'+
                      '<b>Date of Visit:</b> '+date.toUpperCase()+'<br/>'+
                      '<b>County:</b> '+vm.county['label'].toUpperCase()+'<br/>'+
                      '<b>Zone/Cluster:</b> ' +vm.zone['label'].toUpperCase()+'<br/>'+
                      '<b>School:</b> '+vm.school['label'].toUpperCase()+'<br/>'+
                      '<b>Teacher:</b> <br/>'+
                      '<b>Name of CHV:</b> <br/>'+
                      '<b>Name Of CHA:</b> <br/>'+
                      '<b>RTI Officer:</b> '+rtiOfficer.toUpperCase()+'<br/>'+
                      '<br/>'+
                      '<table width="100%" border="1">'+
                      '<tr>'+
                      '<th colspan="6">Class Enrollment</th>'+
                      '<th>Total</th>'+
                      '</tr>'+
                      '<tr>'+
                      '<th colspan="2">Multi-grade</th>'+
                      '<th colspan="2">PP1</th>'+
                      '<th colspan="2">PP2</th>'+
                      '<th></th>'+
                      '</tr>'+
                      '<tr>'+
                      '<th>Boys</th>'+
                      '<th>Girls</th>'+
                      '<th>Boys</th>'+
                      '<th>Girls</th>'+
                      '<th>Boys</th>'+
                      '<th>Girls</th>'+
                      '<th></th>'+
                      '</tr>'+
                      '<tr>'+
                      '<td></td>'+
                      '<td></td>'+
                      '<td>'+subtestDoc['Class demographics']['boys_pp1']+'</td>'+
                      '<td>'+subtestDoc['Class demographics']['girls_pp1']+'</td>'+
                      '<td>'+subtestDoc['Class demographics']['boys_pp2']+'</td>'+
                      '<td>'+subtestDoc['Class demographics']['girl_pp2']+'</td>'+
                      '<td>'+pupils+'</td>'+
                      '</tr>'+
                      '</table>'+'<br/>'+
                      '<br/>'+
                      '<h3>Assessment of Activity</h3>'+
                      '<table width="100%" border="1">'+
                      '<tr>'+
                      '<th>WHAT WENT WELL</th>'+
                      '<th>WHAT DID NOT GO WELL</th>'+
                      '<th>ADVICE FROM THE CHA OFFICER TO CHV</th>'+
                      '<th>ADVICE TO THE CHA FROM RTI OFFICER</th>'+
                      '</tr>'+
                      '<tr>'+
                      '<td>'+went_well+'</td>'+
                      '<td>'+went_wrong+'</td>'+
                      '<td></td>'+
                      '<td></td>'+
                      '</tr>'+
                      '</table>'+
                      '<br/>'+
                      '<h3>General Comments And Recommendations</h3>'+
                      ''+comments+
                      '<br/>'+
                      ''+vm.notes+
                      '</body></html>';

          console.log('Document generated');

          var converted = htmlDocx.asBlob(content, {orientation: 'landscape', margins: {top: 720}});
          saveAs(converted, 'trip.docx');
        }
        else{
          alert('A document cannot be generated for this trip.');
        }   
      }
    }
  }
}());

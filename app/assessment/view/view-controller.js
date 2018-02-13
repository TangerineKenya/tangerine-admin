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
    vm.exportToWord = exportToWord;
    vm.county = {};
    vm.zone = {};
    vm.school = {};
    vm.locationList = {};
    var assessmentDoc = {};
    var subtestDoc = {};

    activate();

    //////////////////////////////
    function activate(){
      var promises = [getTrip(), LocationService.getLocations()]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
        vm.locationList = LocationService.getLocations();
        getTrip();
      });
    }

    function getTrip(){
      vm.assessment = AssessmentService.getTrip(vm.tripId).then(success).catch(fail);

      function success(resp){
        vm.assessment = resp.rows;
        buildTripData(vm.assessment);

        //console.log('Data', vm.assessment);
      }

      function fail(err){
        console.log(err);
      }
    }

    function buildTripData(trip){
      _.forEach(trip, function(value, key){
          //build each assessment doc
          assessmentDoc[value.doc.assessmentName] = value.doc;

          //console.log('subtests', value);

        _.forEach(value.doc.subtestData, function(val, k){
          //build sub test doc
          subtestDoc[val.name] = val.data;
        });

      });
      //get location details
      var countyId = '';
      var zoneId = '';
      var schoolId = '';
        
      if(subtestDoc['School Location']['location']!=null){
        countyId = subtestDoc['School Location']['location'][0];
        zoneId = subtestDoc['School Location']['location'][1];
        schoolId = subtestDoc['School Location']['location'][2];
      }
      //console.log('location', subtestDoc['School Location']['location']);
      getLocations(countyId, zoneId, schoolId);
    }
    
    function getLocations(countyId, zoneId, schoolId){
      
      if(vm.locationList['locations']!=null){
        vm.county = vm.locationList['locations'][countyId];
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
        //console.log(vm.locationList['locations'][countyId]);
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
      if(vm.email){
        
      }
      else{
        alert('Please provide an email');
      }
    }

    function exportToWord(){
      if(assessmentDoc['Tayari Child Health Intervention Tool']!=null){
        exportCHIToolToWord();
      } 
      else if(assessmentDoc['Lesson Observation RTI']!=null || assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']!=null || assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation']!=null){
        exportRTIToolToWord();
      }
      else{
        alert('A document cannot be generated for this type of trip/observation');
      }
    }

    function exportRTIToolToWord(){
      var rtiOfficer = '';
      if(assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']!=null){
        rtiOfficer = assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation - treatment 1']['enumerator'];
      }

      if(assessmentDoc['Lesson Observation RTI']!=null){
        rtiOfficer = assessmentDoc['Lesson Observation RTI']['enumerator'];
      }

      if(assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation']!=null){
        rtiOfficer = assessmentDoc['Pre-Observation Tool - Sub-County ECD Coordinator observation']['enumerator'];
      }
       
      var activities = {
          "language": 'Language Activities',
          "math": 'Maths Activities',
          "social": 'Social Activities',
          "life_skills": 'Life skills Activities'
      };

      var preparedness = {
        3: 'Very well prepared',
        2: 'Prepared',
        1: 'Unprepared'
      };

      if(subtestDoc['Date and Time']!=null && subtestDoc['School Location']!=null && vm.county['label']!=null){
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
                    
          if(subtestDoc['Classroom Demographics']['select_subject']!=null){
            activityKey =  subtestDoc['Classroom Demographics']['select_subject'];
          }

          day = subtestDoc['Classroom Demographics']['lesson_day'];
          week = subtestDoc['Classroom Demographics']['lesson_week'];

          if(subtestDoc['Classroom Demographics']['teacher_name']!=null){
            teacher = subtestDoc['Classroom Demographics']['teacher_name'];
          }

          if(subtestDoc['Classroom Demographics']['SCC_coach']!=null){
            coach = subtestDoc['Classroom Demographics']['SCC_coach'];
          }

          if(subtestDoc['Classroom Demographics']['boys']!=null){
            boys = subtestDoc['Classroom Demographics']['boys'];
          }

          if(subtestDoc['Classroom Demographics']['girls']!=null){
            girls = subtestDoc['Classroom Demographics']['girls'];
          }

          if(subtestDoc['Classroom Demographics']['boys_present']!=null){
            boys = subtestDoc['Classroom Demographics']['boys_present'];
          }

          if(subtestDoc['Classroom Demographics']['girls_present']!=null){
            girls = subtestDoc['Classroom Demographics']['girls_present'];
          }

          pupils = parseInt(boys)*1 + parseInt(girls)*1;
        }

        if(subtestDoc['Class Demographics']!=null){
                    
          if(subtestDoc['Class Demographics']['select_subject']!=null){
            activityKey =  subtestDoc['Class Demographics']['select_subject'];
          }

          day = subtestDoc['Class Demographics']['ls_dy'];
          week = subtestDoc['Class Demographics']['ls_wk'];

          if(subtestDoc['Class Demographics']['teacher_name']!=null){
            teacher = subtestDoc['Class Demographics']['teacher_name'];
          }

          if(subtestDoc['Class Demographics']['SCC_coach']!=null){
            coach = subtestDoc['Class Demographics']['SCC_coach'];
          }

          if(subtestDoc['Class Demographics']['tl_enr_by']!=null){
            boys = subtestDoc['Class Demographics']['tl_enr_by'];
          }

          if(subtestDoc['Class Demographics']['tl_enr_gl']!=null){
            girls = subtestDoc['Class Demographics']['tl_enr_gl'];
          }

          if(subtestDoc['Class Demographics']['tl_by']!=null && subtestDoc['Class Demographics']['tl_by'] != 'logicSkipped'){
            boys = subtestDoc['Class Demographics']['tl_by'];
          }

          if(subtestDoc['Class Demographics']['tl_gl']!=null && subtestDoc['Class Demographics']['tl_gl'] != 'logicSkipped'){
            girls = subtestDoc['Class Demographics']['tl_gl'];
          }

          pupils = parseInt(boys)*1 + parseInt(girls)*1;
        }

        if(subtestDoc['Lesson observation']!=null){
          prepKey = subtestDoc['Lesson observation']['lessn_present'];
          went_well = subtestDoc['Lesson observation']['tchr_did_well'];
          went_wrong = subtestDoc['Lesson observation']['tchr_not_undrsnd_well'];
          duration = subtestDoc['Lesson observation']['lssn_duration'];
          
          if(subtestDoc['Lesson observation']['teacher_name']!=null){
            teacher = subtestDoc['Lesson observation']['teacher_name'];
          }
        }

        if(subtestDoc['During observation']!=null){
          prepKey = subtestDoc['During observation']['teacher_preparedness'];
          went_well = subtestDoc['During observation']['what_went_well'];
          went_wrong = subtestDoc['During observation']['lesson_improvement'];
          duration = subtestDoc['During observation']['lesson_duration'];
          //teacher = subtestDoc['During observation']['Teacher_name'];
          feedback_to_dicece = subtestDoc['During observation']['officer_feedback'];
          //coach = subtestDoc['During observation']['SCC_Coach_name'];

          if(subtestDoc['During observation']['Teacher_name']!=null){
            teacher = subtestDoc['During observation']['Teacher_name'];
          }

          if(subtestDoc['During observation']['SCC_Coach_name']!=null){
            coach = subtestDoc['During observation']['SCC_Coach_name'];
          }
        }

        if(subtestDoc['During Observation']!=null){
          prepKey = subtestDoc['During Observation']['teacher_preparedness'];
          went_well = subtestDoc['During Observation']['what_went_well'];
          went_wrong = subtestDoc['During Observation']['lesson_improvement'];
          duration = subtestDoc['During Observation']['lesson_duration'];
          //teacher = subtestDoc['During observation']['Teacher_name'];
          feedback_to_dicece = subtestDoc['During Observation']['officer_feedback'];
          //coach = subtestDoc['During observation']['SCC_Coach_name'];

          /*if(subtestDoc['During Observation']['Teacher_name']!=null){
            teacher = subtestDoc['During Observation']['Teacher_name'];
          }

          if(subtestDoc['During Observation']['SCC_Coach_name']!=null){
            coach = subtestDoc['During Observation']['SCC_Coach_name'];
          }*/
        }

        if(subtestDoc['During reading observation']!=null){
          prepKey = subtestDoc['During reading observation']['teacher_preparedness'];
          went_wrong = subtestDoc['During reading observation']['teacher_not_understand'];
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

        if(subtestDoc["Assessor's General Comments"]!=null){
          dicece_feedback = subtestDoc["Assessor's General Comments"]['SCC_feedback'];
          feedback_to_dicece = subtestDoc["Assessor's General Comments"]['rtio_feedback'];
          comments = subtestDoc["Assessor's General Comments"]['lsda_recmnds'];
        }

        if(subtestDoc['Remarks after observation']!=null){
          dicece_feedback = subtestDoc['Remarks after observation']['dicece_suggestion'];
          feedback_to_dicece = '';
          comments = subtestDoc['Remarks after observation']['general_comments'];
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

        //console.log('Document generated');

        var converted = htmlDocx.asBlob(content, {orientation: 'landscape', margins: {top: 720}});
        saveAs(converted, 'trip.docx');
      }
      else{
        toastr.error('A document cannot be generated for this trip/observation.');
      }
    }

    function exportCHIToolToWord(){
      //health tool export
      if(assessmentDoc['Tayari Child Health Intervention Tool']!=null){
        if(subtestDoc['Class demographics']!=null && subtestDoc['Feedback session']!=null && subtestDoc['Date and Time']!=null && subtestDoc['School Location']!=null && vm.county['label']!=null){
          
        var rtiOfficer = '';
        if(assessmentDoc['General Information']!=null){
          rtiOfficer = assessmentDoc['General Information']['enumerator'];
        }

        var teacher = '';
        
        if(subtestDoc['Class demographics']['teacher_name']!=null){
          teacher = subtestDoc['Class demographics']['teacher_name'];
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
                      '<b>Teacher:</b> '+teacher+'<br/>'+
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
          toastr.error('A document cannot be generated for this trip/observation.');
        }   
      }
      else{
        toastr.error('A document cannot be generated for this trip/observation.');
      }
    }
  }
}());

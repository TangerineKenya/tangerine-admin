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
    vm.assessmentId = $stateParams.id;
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
      var promises = [AssessmentService.getAssessment(vm.assessmentId)]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.assessment = AssessmentService.getAssessment(vm.assessmentId);
         vm.notes = vm.assessment.notes;
         getSubtests();
         console.log('Observation loaded..',vm.assessment);
      });
    }

    function getSubtests(){
      var sub = vm.assessment.subtestData;
      _.forEach(sub, function(value, key) {
          vm.subtests[value.name] = value.data;  
          //console.log('Subtest', value.data);        
        });
      return vm.subtests;
    }

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
      if(vm.email){
  
      }
      else{
         console.log('Please provide an email');
      }
    }

    function exportToPdf(){
      AssessmentService.exportToPdf;
      console.log('Exporting...');
    }
  }
}());

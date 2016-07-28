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
    .module('feedback')
    .controller('ViewCtrl', ViewCtrl);


  ViewCtrl.$inject = ['FeedbackService','$stateParams','$q', '$location'];

  function ViewCtrl(FeedbackService, $stateParams, $q, $location) {
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

    activate();

    /////////////////
    function activate(){
      var promises = [FeedbackService.getAssessment(vm.assessmentId)]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.assessment = FeedbackService.getAssessment(vm.assessmentId);
         vm.notes = vm.assessment.notes;
         getSubtests();
         console.log('Observation loaded..',vm.subtests);
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
      FeedbackService.postAssessment(vm.assessment);

      activate();
      //$location.path('feedback');
    }

    function allowSend(){
      return vm.show;
    }

    function sendEmail(){

      console.log('Email', vm.email);
    }
  }
}());

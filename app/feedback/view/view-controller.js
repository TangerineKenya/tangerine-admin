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


  ViewCtrl.$inject = ['FeedbackService','$stateParams','$q'];

  function ViewCtrl(FeedbackService, $stateParams, $q) {
    var vm = this;
    vm.assessmentId = $stateParams.id;
    vm.assessment = {};
    vm.subtests =  {};

    activate();

    /////////////////
    function activate(){
      var promises = [FeedbackService.getAssessment(vm.assessmentId)]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.assessment = FeedbackService.getAssessment(vm.assessmentId);
         getSubtests();
         console.log('Observation loaded..',vm.subtests);
      });
    }

    function getSubtests(){
      var sub = vm.assessment.subtestData;
      _.forEach(sub, function(value, key) {
          vm.subtests[value.name] = value.data;  
          //console.log('Subtest', vm.subtests);        
        });
      return vm.subtests;
    }

    function postComments(){
      
    }

    function sendEmail(){

    }
  }
}());

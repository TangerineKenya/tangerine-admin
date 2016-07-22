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

    activate();

    function activate(){
      var promises = [FeedbackService.getAssessment(vm.assessmentId)]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.assessment = FeedbackService.getAssessment(vm.assessmentId);
         console.log('Observation loaded..',vm.assessment);
      });
    }
  }
}());

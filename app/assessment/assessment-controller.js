(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name feedback.controller:FeedbackCtrl
   *
   * @description
   *
   */
  angular
    .module('assessment')
    .controller('AssessmentCtrl', AssessmentCtrl);

  AssessmentCtrl.$inject = ['AssessmentService','$q']

  function AssessmentCtrl(AssessmentService,$q) {
    var vm = this;
    vm.ctrlName = 'AssessmentCtrl';
    vm.observations = {};

    activate();

    /**
     * Activate the Feedback Controller
     */
    function activate() {
      var promises = [AssessmentService.getAssessments()]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.observations = AssessmentService.getAssessments();
      });
    }
  }
}());

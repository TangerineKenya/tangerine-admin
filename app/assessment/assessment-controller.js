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

  AssessmentCtrl.$inject = ['AssessmentService','UserService', '$q']

  function AssessmentCtrl(AssessmentService, UserService, $q) {
    var vm = this;
    vm.ctrlName = 'AssessmentCtrl';
    vm.observations = {};
    vm.users = {};

    activate();

    /**
     * Activate the Feedback Controller
     */
    function activate() {
      var promises = [AssessmentService.getAssessments(), UserService.getUsers()];
      
      return $q.all(promises).then(function () {
        vm.observations = AssessmentService.getAssessments();

        vm.users = UserService.getUsers();

      });
    }
  }
}());

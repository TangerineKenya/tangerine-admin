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
    .module('feedback')
    .controller('FeedbackCtrl', FeedbackCtrl);

  FeedbackCtrl.$inject = ['FeedbackService','$q']

  function FeedbackCtrl(FeedbackService,$q) {
    var vm = this;
    vm.ctrlName = 'FeedbackCtrl';
    vm.observations = {};

    activate();

    /**
     * Activate the Feedback Controller
     */
    function activate() {
      var promises = [FeedbackService.getObservations()]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.observations = FeedbackService.getObservations();
         console.log('Observations has been loaded..',vm.observations);
      });
    }
  }
}());

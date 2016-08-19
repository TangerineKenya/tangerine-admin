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
    vm.userTrips = {};
    vm.users = {};
    vm.user = '';
    vm.month = '1';
    vm.year = '2016';
    vm.search = getTrips;

    activate();

    /**
     * Activate the Controller
     */
    function activate() {
      var promises = [UserService.getUsers()];
      
      return $q.all(promises).then(function () {
   
        vm.users = UserService.getUsers();

      });
    }

    function getTrips() 
    {
      var userKey = vm.user+'-'+vm.month+'-'+vm.year;

      var trips= AssessmentService.getTrips(userKey).then(success).catch(fail);

      function success(resp){
        //vm.userTrips = resp;
        _.forEach(resp.rows, function(value, key) {
            vm.userTrips = value.value.trips
            //console.log(vm.userTrips);
        });
        console.log(userKey, resp);
      }

      function fail(err)
      {
        console.log(err);
      }
      
    }
  }
}());

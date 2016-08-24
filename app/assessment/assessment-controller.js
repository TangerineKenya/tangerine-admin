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
    
    vm.month = String(moment().month());
    vm.year = String(moment().year());
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
      if(vm.user){
        vm.userTrips = {};
        var userKey = vm.user+'-'+vm.month+'-'+vm.year;
        AssessmentService.getTrips(userKey).then(success).catch(fail);

        function success(resp){
          _.forEach(resp.rows, function(value, key) {
              vm.userTrips = value.value.trips
          });
          if(Object.keys(vm.userTrips).length === 0){
            alert('The staff has no trips to view.');
          }
          console.log(userKey);
        }

        function fail(err)
        {
          vm.userTrips = {};
          console.log(err);
        }
      }
      else{
        alert('Please select staff to view trips');
      }
    }
  }
}());

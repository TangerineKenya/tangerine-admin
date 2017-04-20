(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name csvexport.controller:CsvexportCtrl
   *
   * @description
   *
   */
  angular
    .module('csvexport')
    .controller('CsvexportCtrl', CsvexportCtrl);

  CsvexportCtrl.$inject = ['CsvexportService', '$http', '$q'];

  function CsvexportCtrl(CsvexportService, $http, $q) {
    var vm = this;
    vm.workflows = {};
    vm.worfklow = '';
    vm.month = String(moment().month()+1);
    vm.year = String(moment().year());
    vm.download = download;
    vm.trip = {};
    vm.tripKeys = [];
    vm.tutorTrips = {};
    vm.output = [];

    vm.instance = 'tusome';

    activate();

    /**
     * Activate the Controller
     */
    function activate() {

      CsvexportService.init();

      var promises = [CsvexportService.init(), CsvexportService.getWorkflows()];
      
      return $q.all(promises).then(function () {
   
        vm.workflows = CsvexportService.getWorkflows();


        console.log(vm.workflows);
      });
    }

    function download(){
      var link = '';
      if(vm.instance == 'tayari'){
        link = 'http://localhost/brockman/workflow/group-tayari/'+vm.workflow+'/'+vm.year+'/'+vm.year;
      }
      else{
        link = 'http://localhost/brockman/workflow/group-national_tablet_program/'+vm.workflow+'/'+vm.year+'/'+vm.year;
      }
      //download
      CsvexportService.getCsv(link);
    }
    //build csv generation
    /*function getCsv(){
      console.log('Start processing..');
      
      getTutorTrips();

      vm.tripKeys = _.uniq(vm.tripKeys);
      _.forEach(vm.tripKeys, function(a){
          //get trip info
          getTrip(a);
          //build output object

          //generate csv
          console.log('Keys', a);
      }); 
      //console.log('Finished processing..');    
    }
    //get trip ids
    function getTutorTrips(){
      CsvexportService.getTutorTrips(vm.year, vm.month, vm.workflow);

      var promises = [CsvexportService.getTutorTrips(vm.year, vm.month, vm.workflow), CsvexportService.getTrips()];
      
      return $q.all(promises).then(function () {
        console.log('Start getting trip ids..');
        vm.tutorTrips = CsvexportService.getTrips();
        //for each loop & get sprit rotut 
        _.forEach(vm.tutorTrips.rows, function(a){
          vm.tripKeys.push(a.value);
          //console.log(vm.tripKeys);
        });
        console.log('Finished getting trips..');
      });
    }
    //get trip
    function getTrip(tripId){
      console.log('Getting trip details..');
      CsvexportService.getSpritRotut(tripId);

      var promises = [CsvexportService.getSpritRotut(tripId), CsvexportService.getTrip()];
      
      return $q.all(promises).then(function () {
                
        vm.trip = CsvexportService.getTrip();
        console.log('Trip', vm.trip);
      });
      console.log('Finished getting trip details..');
    }*/
  }
}());

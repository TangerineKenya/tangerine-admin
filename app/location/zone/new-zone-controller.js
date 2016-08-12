(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name location.controller:NewZoneCtrl
   *
   * @description
   *
   */
  angular
    .module('location')
    .controller('NewZoneCtrl', NewZoneCtrl);

  NewZoneCtrl.$inject = ['LocationService', '$stateParams','$location', '$rootScope'];

    function NewZoneCtrl(LocationService, $stateParams,$location, $rootScope) {
      var vm = this;
      var doc = { children: {}};
      var path = '';
      var subcounty, newDoc, locList = {};
      vm.countyId = $stateParams.county;
      vm.subId = $stateParams.subcounty;
      vm.save = save;
      vm.code = '';
      vm.name = '';
      vm.countyName = '';
      vm.subName = '';
      vm.quota = 0;
      vm.teachers = 0; 
      ////////////////////////////////////    

      //get county & sub county details
      function getDetails(){

      }

      function save(){
        //create new sub doc
        vm.key = LocationService.generateKey();
        
        if($rootScope.group=='tayari'){
          //tayari zone doc
          doc.children[vm.key]={
                  id:vm.key,
                  label:vm.name,
                  code:vm.code,
                  educationQuota: vm.zone.educationQuota,
                  healthQuota: vm.zone.healthQuota,
                  children:{}
                };
        }else{
          //tusome zone doc
          doc.children[vm.key]={
                  id:vm.key,
                  label:vm.name,
                  code:vm.code,
                  quota:vm.quota,
                  teachers:vm.teachers,
                  children:{}
                };
        }
                
        //get location list

        vm.locationList=LocationService.locationList;
        path = 'locations.'+vm.countyId+'.children.'+vm.subId; 

        //get & merge to sub county object

        subcounty = _.get(vm.locationList, path);
        newDoc = _.merge(subcounty, doc);
        //merge to location list

        locList = _.set(vm.locationList,path, newDoc);
        //updated location

        LocationService.save(locList);
        //update quota in subcounty & county
        
        console.log('Zone Saved', locList);

        //redirect
        $location.path('/location');
      }
  }
}());

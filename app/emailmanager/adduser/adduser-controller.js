(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name emailmanager.adduser.controller:AdduserCtrl
   *
   * @description
   *
   */
  angular
    .module('emailmanager')
    .controller('AdduserCtrl', AdduserCtrl);

  AdduserCtrl.$inject = ['LocationService','$q', 'UserService', '$stateParams','$state', '$rootScope'];

  function AdduserCtrl(LocationService, $q, UserService, $stateParams, $state, $rootScope) {
    var vm = this;
    vm.locationList = {};
    vm.user = {};
    vm.userId = $stateParams.id;
    vm.office = '';
    vm.first = '';
    vm.last = '';
    vm.county = '';
    vm.email = '';
    vm.post = postUser;
    
    /**
     * Activate the controller
     */
    activate();
    ///////
    
    function activate() {

      getUser();

      var promises = [LocationService.getLocations()]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.locationList = LocationService.getLocations();
         //vm.user = getUser();
         console.log('Done..');
      });
    }

    //get details
    function getUser(){
      if(vm.userId!=0){
        vm.user = UserService.getUser(vm.userId)
          .then(success)
          .catch(fail);

          function success(resp){
            vm.user = resp;
            vm.office = vm.user.title;
            vm.first = vm.user.first;
            vm.last = vm.user.last;
            vm.email = vm.user.email;
            vm.county = vm.user.county;
            //getCounty();
            //vm.county = vm.locationList['locations'][vm.user.county];
            return resp;
          }

          function fail(err){

          }
      }
    }
    function getCounty(){
      if(vm.user.county == 'All'){
         vm.county = 'All';
      }
      else
      {
        vm.county = vm.locationList['locations'][vm.user.county]
      }
    }
    //add or update user
    function postUser(){
      //if id is null/empty new user - else update user details
      var doc = {};
      var name = '';

      if(vm.userId == 0){ //new
        var id = new Hashids('', 32);
        vm.userId = id.encode(1);
      }
      //logged in users name
      if($rootScope.currentUser){
        name = $rootScope.currentUser.name;
      }

      //console.log(vm.userId);
      doc = {
              "_id": vm.userId,
              "_rev": vm.user._rev,
              "editedBy": name,
              "updated": moment().format('MMMM Do YYYY, h:mm:ss a'),
              "hash": "",
              "fromInstanceId": "aaaa-bbbb-cccc",
              "collection": "report-user",
              "title": vm.office,
              "last": vm.last,
              "first": vm.first,
              "email": vm.email,
              "county": vm.county
            };

      //console.log(doc);
      //$stateParams.id = vm.userId;
      //save
      UserService.postUser(doc)
          .then(success)
          .catch(fail);
              
          function success(resp){
            getUser();
            toastr.info('User saved');
          }

          function fail(err){
            console.log(err);
          }
      //$state.reload();
    }
  }
}());

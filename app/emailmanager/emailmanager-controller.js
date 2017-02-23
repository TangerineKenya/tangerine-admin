(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name emailmanager.controller:EmailmanagerCtrl
   *
   * @description
   *
   */
  angular
    .module('emailmanager')
    .controller('EmailmanagerCtrl', EmailmanagerCtrl);

  EmailmanagerCtrl.$inject = ['$location', '$q', 'UserService','LocationService', '$scope', '$http', '$route'];

  function EmailmanagerCtrl($location, $q, UserService, LocationService, $scope, $http, $route) {
    var vm = this;
    vm.userList = [];
    vm.selected = [];
    vm.select = select;
    vm.selectAll = selectAll;
    vm.sendToUser = sendToUser;
    vm.sendToSelected =  sendToSelected;
    vm.month = String(moment().month()+1);
    vm.year = String(moment().year());
    vm.delete = deleteUsers;
    vm.search = search;
    vm.searchParam = '';
    vm.locationList ={};
    vm.isSelected =  isSelected;

    activate();
    ////////////////////
    
    function activate(){
      var promises = [UserService.getEmailList(), LocationService.getLocations()]; 
      vm.p= promises;
      return $q.all(promises).then(function() {
         
        vm.userList = UserService.getEmailList();
        vm.locationList = LocationService.getLocations();

        console.log('Everything has been loaded..');
      });
    }
    //select receipients
    function select($event, id){
      var checkbox = $event.target;
      var action = (checkbox.checked ? 'add' : 'remove');

      if (action === 'add'){
        //add to array
        vm.selected.push(id);
      }
      else{
        //remove from array
        vm.selected.splice(vm.selected.indexOf(id), 1);
      }
      //return unique values
      vm.selected = _.uniq(vm.selected);

      //console.log('Selected users', vm.selected);
    }
    //select all users
    function selectAll($event){    
      for ( var i = 0; i < vm.userList.rows.length; i++) {
          var user = vm.userList.rows[i];
          select($event, user.id);
      }
    }

    function isSelected(id){
      return vm.selected.indexOf(id) >= 0;
    }
    //send to selected list of users
    function sendToSelected(){
      //loop selected user list
      if(vm.selected.length> 0){
        var i =0;
        for (i = 0; i < vm.selected.length; i++) { 
          //send
          sendToUser(vm.selected[i]);
        }
      }
      else
      {
        toastr.error('Please select at least 1 email receipient.');
      }
    }
    //send to user
    function sendToUser(id){
      UserService.getUser(id)
           .then(success)
           .catch(fail);

          function success(user){
            //send email to user
            if(user && user.county != undefined){
              //get county
              var instance = 'tayari';
              var group = '';
              var email = '';
              var county = '';

              if(instance=='tayari'){
                //get tayari data
                county = user.county;
                email = user.email;
                group = 'group-tayari';
              }
              else{
                //get tusome data
                county = user.doc.county;
                email = user.doc.email;
                group = 'group-national_tablet_program';
              }
              //request
              var request = {
                         method: 'GET',
                         url: 'http://localhost:9292/email/'+email+'/'+group+'/'+vm.year+'/'+vm.month+'/'+county+'.html',
                         headers: {
                            'Content-Type': 'application/html',
                            "Access-Control-Allow-Origin": "*",
                            'Accept': 'application/html'
                         }
                        }
              //send
              $http(request)
                .then(success)
                .catch(fail);

                function success(resp){
                  console.log(resp);
                }

                function fail(err){
                  console.log(err);
                }
                //alert('');
            }
            else{
              alert('The user details cannot be found!');
            }
          } 

          function fail(err){
            console.log(err);
          }
    }
    //delete
    function deleteUsers(){
      //delete selected users
      var r = confirm("Are you sure you want to delete "+vm.selected.length+" users?");
      if (r == true) {
          //delete if ok selected
          var i = 0;
          if(vm.selected.length> 0){
            for (i = 0; i < vm.selected.length; i++) { 
              UserService.deleteUser(vm.selected[i]);
            }
            toastr.info(vm.selected.length+' user (s) deleted.');
            activate();//reload
            $route.reload();
          }
      } else {
          //do nothing
      }
    }
    //search
    function search(){

    }
  }
}());

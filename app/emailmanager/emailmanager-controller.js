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

  EmailmanagerCtrl.$inject = ['$location', '$q', 'UserService','LocationService', '$scope', '$http', '$state'];

  function EmailmanagerCtrl($location, $q, UserService, LocationService, $scope, $http, $state) {
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
    vm.reload = activate;

    activate();
    ////////////////////
    
    function activate(){
      UserService.init();

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
        //reload page
        $state.reload();
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
            if(user){
              //get county
              var instance = 'tusome';
              var group = '';
              var email = '';
              var county = '';
              var url = '';
              
              if(instance == 'tayari'){
                //get tayari data
                county = user.county;
                email = user.email;
                group = 'group-tayari';
              }
              else{
                //console.log(user);
                //get tusome data
                county = user.county;
                email = user.email;
                group = 'group-national_tablet_program';
              }
              //update sent
              var sent  = vm.year+'-'+moment(vm.month).format('MMM');//moment().format('YYYY-MMM');
              //user object doesn't contain monthSent property
              if(user.monthsSent == undefined){
                _.set(user,'monthsSent',[]);
              }
              //push the data
              user.monthsSent.push(sent);
              
              user.monthsSent = _.uniq(user.monthsSent);

              UserService.postUser(user);

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
                  toastr.info('The report has been sent to '+user.first+' '+user.last+' ( '+email+' )');
                }

                function fail(err){
                  toastr.error('The report to '+user.first+' '+user.last+' ( '+email+' ) could not be sent. Please try again later.');
                }
            }
            else{
              toastr.error('The user details cannot be found!');
            }
          } 

          function fail(err){
            toastr.error('Error')
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
              UserService.init();
            }
            toastr.info(vm.selected.length+' user (s) deleted.');
            activate();
            //reload
            $state.reload();
            //$location.path('app/emailmanager');
          }
      } else {
          //do nothing
      }
    }    
    //search
    function search(){
      vm.userList = UserService.searchUsers(_.capitalize(vm.searchParam))
        .then(success)
        .catch(fail);

        function success(resp){
          vm.userList = resp;

          if(resp.rows.length == 0){
            toastr.error('The user cannot be found');
            vm.userList = UserService.getEmailList();
          }
          //console.log(resp.rows.length);
        }
        
        function fail(err){
          console.log(err);
        }
    }
  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name users.view.controller:ViewCtrl
   *
   * @description
   *
   */
  angular
    .module('users')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['UserService','$stateParams','$q'];


  ////////////////////////////

  function UserCtrl(UserService, $stateParams, $q) {
    var vm =this;
    vm.user = {};
    vm.userId = $stateParams.id;
    vm.update = update;
    
    activate();


    ///////////
    function activate(){
      vm.user = UserService.getUser(vm.userId)
        .then(success)
        .catch(fail);
      
      function success(resp){
        vm.user = resp;
      }

      function fail(err){
        console.log(err);
      }
    }

    function update(){

    }
  }
}());

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

    activate();

    function activate(){
      var promises = [getUser()];
      vm.p = promises;
      return $q.all(promises).then(function() {
          vm.user = getUser(vm.userId);
          console.log('User', vm.userId, vm.user);
      });
    }

    function getUser(){
      vm.user = UserService.getUser(vm.userId);

      return vm.user;
    }
    
  }
}());

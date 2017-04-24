(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name users.controller:UsersCtrl
   *
   * @description
   *
   */
  angular
    .module('users')
    .controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ['UserService','$q'];

  function UsersCtrl(UserService,$q) {
    var vm = this;
    vm.userList = {};

    activate();

    /**
     * Activate the Locations Controller
     */
    function activate() {
      var promises = [UserService.getUsers()]; //[getMessageCount(), getSchools(), ];
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.userList = UserService.getUsers();
         console.log('Users have been loaded..',vm.userList);
      });
    }


    function download(){

    }
  }
}());

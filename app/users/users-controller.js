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
    vm.flatList = [];

    activate();

    /**
     * Activate the Locations Controller
     */
    function activate() {
      var promises = [UserService.getUsers()]; //[getMessageCount(), getSchools(), ];
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.userList = UserService.getUsers();
         flattenList();
         console.log('Users have been loaded..',vm.userList);
      });
    }


    function flattenList(){

      _.forEach(vm.userList.rows, function(c, val) {
          //console.log(c.doc);
                vm.flatList.push([
                  c.doc.name,
                  c.doc.role,
                  c.doc.email,
                  c.doc.mpesaPhone,
                  c.id,
                  c.doc.location['county'],
                  c.doc.location['subcounty'],
                  c.doc.location['zone']
                ]);
              });

      return vm.flatList;
    }
  }
}());

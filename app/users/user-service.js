(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name users.service:UserService
   *
   * @description
   *
   */
  angular
    .module('users')
    .service('UserService', UserService);
  
  UserService.$inject = ['DataService']

  function UserService(DataService) {
    var service ={
      init: init,
      userList: {},
      getUsers: getUsers,
      getUser: getUser
    };
    
    service.init();

    return service;

    ////////////////////////////////////////////////////////////////////
    function init(){
      service.userList = DataService.prod.query('reporting/userByRole', {
        key: 'rti-tayari-team',
        include_docs: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.userList = response;
      }
      function fail(err){
        console.log(err);
      }
    }

    function getUsers(){
      return service.userList;
    }

    function getUsersByRole(role){
      return DataService.prod.query('reporting/userByRole', {
        key: role,
        include_docs: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        return response;
      }
      function fail(err){
        console.log(err);
      }
    }

    function getUser(id){
      return DataService.prod.get(id)
        .then(success)
        .catch(fail);

      function success(response) {
        service.user = response;
        return response;
      }
      function fail(error) {
        console.log(error);
        return {};
      }
    }
  }
}());

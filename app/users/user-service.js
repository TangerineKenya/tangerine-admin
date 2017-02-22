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
  
  UserService.$inject = ['DataService', '$cookies', '$location']

  function UserService(DataService, $cookies, $location) {
    
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
      getUsersByRole('cso');
    }

    function getUsers(){
      return service.userList;
    }

    function getUsersByRole(role){
      service.userList = DataService.prod.query('reporting/userByRole', {
        key: role,
        include_docs: true
      })
      .then(success)
      .catch(fail);

      function success(response){
        service.userList =  response;
        return response;
      }
      function fail(err){
        console.log(err);
      }
      /*service.userList = DataService.prod.allDocs({
          include_docs: true,
          attachments: true,
          startkey: 'user',
          endkey: 'user\uffff'
        }).then(function (result) {
          service.userList = result;
        }).catch(function (err) {
          console.log(err);
      });*/
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

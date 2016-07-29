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

    ///////////////////////////////////
    function init(){
      service.userList = DataService.prod.allDocs({
          include_docs: true,
          attachments: false,
          startkey: 'user-',
          endkey: 'user-\uffff'
        })
        .then(success)
        .catch(fail);

      function success(response) {
        console.log("User List Returned");
        service.userList=response;
        return response;
      }
      function fail(error) {
        console.log(error);
        return {};
      }
    }

    function getUsers(){
      return service.userList;
    }

    function getUser(id){
      DataService.prod.get(id)
        .then(success)
        .catch(fail);

      function success(response) {
        //console.log("User serv", response);
        return response;
      }
      function fail(error) {
        console.log(error);
        return {};
      }
    }
  }
}());

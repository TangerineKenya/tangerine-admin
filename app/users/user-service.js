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
      /*service.userList = DataService.prod.allDocs({
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
      }*/
      service.userList = DataService.prod.query('t/byCollection', {
        key: 'users',
        reduce: false,
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

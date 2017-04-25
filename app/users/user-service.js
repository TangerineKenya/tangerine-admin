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
      emailList: {},
      getEmailList: getEmailList,
      getUsers: getUsers,
      getUser: getUser,
      deleteUser: deleteUser,
      postUser: postUser,
      searchUsers: searchUsers
    };

    service.init();

    return service;

    ////////////////////////////////////////////////////////////////////
    function init(){
      getUsersByRole('cso');
      //getUsersByRole('rti-staff');
      getEmailUsers();
    }

    function getUsers(){
      return service.userList;
    }
    function getEmailList(){
      return service.emailList;
    }
    function getUsersByRole(role){
      service.userList = DataService.prod.query('reporting/userByRole', {
        //key: role,
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
    function getEmailUsers(){
      service.emailList = DataService.prod.query('reporting/reportUsers')
      .then(success)
      .catch(fail);

      function success(response){
        service.emailList =  response;
        //console.log(response);
        return response;
      }
      function fail(err){
        console.log(err);
      }
    }
    function getUser(id){
      return DataService.prod.get(id);
    }
    //delete doc
    function deleteUser(user){
      return DataService.prod.get(user).then(function (doc) {
        doc._deleted = true;
        return DataService.prod.put(doc);
      });
    }

    function postUser(user){
      return DataService.prod.put(user);
    }
    //search
    function searchUsers(last){
      return DataService.prod.query('reporting/reportUsers', {
        key: last,
        include_docs: true
      });
    }
  }
}());

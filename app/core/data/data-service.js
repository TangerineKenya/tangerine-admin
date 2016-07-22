(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name data.service:Data
   *
   * @description
   *
   */
  angular
    .module('core.data')
    .service('DataService', DataService);
  
  DataService.$inject = ['pouchDB'];
  
  function DataService(pouchDB) {
    var service = {
      db: null, 
      remote: null,
      init: init
    };
    service.init();
    return service;

    function init(){

      service.prod = pouchDB('http://localhost:5984/group-national_tablet_program');
     
      service.prod.login('admin', 'admin', function (err, resp){
        if(err){
          if (err.name === 'unauthorized') {
            console.log('name or password incorrect');
          } else {
            console.log('Connected',service.prod.info());
          }
        }
      });
      //service.local = new pouchDB('LocalDB');
      /*service.local = pouchDB('http://localhost:5984/group-national_tablet_program');
      service.local.login('admin', 'admin', function (err, resp){
          if(err){
            if (err.name === 'unauthorized') {
              console.log('name or password incorrect');
            } else {
              console.log('cosmic rays, a meteor, etc.');
            }
          }
      });*/
    }
  }
}());

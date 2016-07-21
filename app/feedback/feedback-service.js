(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name feedback.service:FeedbackService
   *
   * @description
   *
   */
  angular
    .module('feedback')
    .service('FeedbackService', FeedbackService);

  FeedbackService.$inject = ['DataService']

  function FeedbackService(DataService) {
    var service ={
      init: init,
      observations: {},
      getObservations: getObservations
    };
    
    service.init();

    return service;

    ///////////////////////////////////
    function init(){
      var ddoc = {
        _id: '_design/my_index',
        views: {
          by_name: {
            map: function (doc) { emit(doc.assessmentName); }.toString()
          }
        }
      };
      // save it
      DataService.prod.put(ddoc).then(function () {
        // success!
        console.log(ddoc);
      }).catch(function (err) {
        // some error (maybe a 409, because it already exists?)
      });

      DataService.prod.query('my_index/by_name',{
          include_docs: true
      }).then(function (res) {
        // got the query results
        console.log(res);
      }).catch(function (err) {
        // some error
      });
    }

    function getObservations(){
      return service.observations;
    }
  }
}());

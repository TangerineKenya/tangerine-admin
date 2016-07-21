(function () {
  'use strict';

  angular
    .module('feedback')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('app.feedback', {
        url: '/feedback',
        templateUrl: 'feedback/feedback.tpl.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'feedback'
      });
  }
}());

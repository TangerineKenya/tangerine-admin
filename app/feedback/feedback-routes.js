(function () {
  'use strict';

  angular
    .module('feedback')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home.feedback', {
        url: '/feedback',
        templateUrl: 'feedback/feedback.tpl.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'vm',
        bindToController: true
      })
      .state('home.view', {
        url: '/feedback/view/:id',
        templateUrl: 'feedback/view/view.tpl.html',
        controller: 'ViewCtrl',
        controllerAs: 'vm'
      });
  }
}());

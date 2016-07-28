(function () {
  'use strict';

  angular
    .module('feedback')
    .config(config);

  function config($stateProvider) {
    
    //$locationProvider.html5Mode(true);

    $stateProvider
      .state('home.assessments', {
        url: '/assessments',
        templateUrl: 'feedback/feedback.tpl.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'vm',
        bindToController: true
      })
      .state('home.assessment', {
        url: '/feedback/view/:id',
        templateUrl: 'feedback/view/view.tpl.html',
        controller: 'ViewCtrl',
        controllerAs: 'vm'
      });
  }
}());

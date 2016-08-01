(function () {
  'use strict';

  angular
    .module('assessment')
    .config(config);

  function config($stateProvider) {
    
    //$locationProvider.html5Mode(true);

    $stateProvider
      .state('home.assessments', {
        url: '/assessments',
        templateUrl: 'assessment/assessment.tpl.html',
        controller: 'AssessmentCtrl',
        controllerAs: 'vm',
        bindToController: true
      })
      .state('home.assessment', {
        url: '/assessment/view/:id',
        templateUrl: 'assessment/view/view.tpl.html',
        controller: 'ViewCtrl',
        controllerAs: 'vm'
      });
  }
}());

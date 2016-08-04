(function() {
  'use strict';

  angular
    .module('assessment')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home.assessments',
        config: {
          url: '/assessments',
          templateUrl: 'assessment/assessment.tpl.html',
          controller: 'AssessmentCtrl',
          controllerAs: 'vm',
          bindToController: true

        }
      },
      {
        state: 'home.assessment',
        config: {
          url: '/assessment/view/:id',
          templateUrl: 'assessment/view/view.tpl.html',
          controller: 'ViewCtrl',
          controllerAs: 'vm',
          bindToController: true
        }
      }
    ];
  }
})();
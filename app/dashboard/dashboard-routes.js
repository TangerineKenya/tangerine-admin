(function() {
    'use strict';

    angular
        .module('dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.dashboard',
                config: {
                    url: '/',
                    templateUrl: 'dashboard/dashboard.tpl.html',
                    controller: 'DashboardCtrl',
                    controllerAs: 'dashboard',
                    bindToController: true
                }
            }
        ];
    }
})();
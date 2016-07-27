(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'logger', '$rootScope'];
    /* @ngInject */
    function appRun(routerHelper, logger, $rootScope) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    templateUrl: 'core/login/login.tpl.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'home',
                config: {
                    url: '/app',
                    templateUrl: 'layout/shell.html',
                    title: 'Home'
                }
            },
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'layout/404.html',
                    title: '404'
                }
            }
        ];
    }
})();

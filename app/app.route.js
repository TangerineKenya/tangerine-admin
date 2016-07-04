(function() {
    'use strict';

    angular
        .module('tangerineAdmin')
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
                    templateUrl: 'layout/shell.html'
                }
            },
            {
                state: 'app.404',
                config: {
                    url: '/404',
                    templateUrl: 'layout/404.html',
                    title: '404'
                }
            }

        ];
    }
})();

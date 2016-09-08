(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'logger'];
    /* @ngInject */
    function appRun(routerHelper, logger) {
        var otherwise = '/404';
        
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    url: '/',
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
                    //resolve: { authenticate: authenticate },
                    title: 'Home'
                }
            },
            {
                state: 'home.dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'dashboard/dashboard.tpl.html',
                    //resolve: { authenticate: authenticate },
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

    /*function authenticate($rootScope, $q, $state, $timeout, $cookies){
        var loggedIn = $cookies.get('loggedIn');
        if($rootScope.loggedIn = true){
            return $q.when();
        }
        else{
            $timeout(function() {
              $state.go('/')
            })

            // Reject the authentication promise to prevent the state from loading
            return $q.reject()
        }
    }*/
})();

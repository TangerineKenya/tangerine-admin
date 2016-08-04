(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'logger', '$rootScope', '$http'];
    /* @ngInject */
    function appRun(routerHelper, logger, $rootScope, $http) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
        $rootScope.group = 'default';
        /*$rootScope.dbSettings = {};
        
        var json = 'assets/settings.json';

        $http.get(json, function(response){
             $rootScope.dbSettings = response.settings;
        });*/
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
                    resolve: { authenticate: authenticate },
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

    function authenticate($rootScope, $q, $state, $timeout){
        if($rootScope.loggedIn = true){
            return $q.when();
        }
        else{
            $timeout(function() {
              $state.go('app')
            })

            // Reject the authentication promise to prevent the state from loading
            return $q.reject()
        }
    }
})();

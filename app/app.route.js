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
        //load json
        var json = 'assets/settings.json';

      $http.get(json)
            .success(success)
            .error(fail);
      
      function success(response){
        $rootScope.dbSettings = response.settings;
      }

      function fail(error){
        console.log(error);
      }
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

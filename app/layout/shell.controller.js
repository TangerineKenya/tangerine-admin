(function() {
    'use strict';

    angular
        .module('layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'routerHelper'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, routerHelper) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Created by John Papa',
            link: 'http://twitter.com/john_papa'
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
            console.log(getNavRoutes());
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();

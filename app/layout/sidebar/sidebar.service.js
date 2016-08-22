(function() {
    'use strict';

    angular
        .module('layout.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http', '$rootScope'];
    function SidebarLoader($http, $rootScope) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {

          if($rootScope.loggedIn = true){
            var menuJson = 'assets/user-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache

            if($rootScope.currentUser!=null && $rootScope.currentUser.roles[0]==='_admin'){
              var menuJson = 'assets/sidebar-menu.json',
                menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            }

            onError = onError || function() { alert('Failure loading menu'); };

            $http
              .get(menuURL)
              .success(onReady)
              .error(onError);
          }
        }
    }
})();

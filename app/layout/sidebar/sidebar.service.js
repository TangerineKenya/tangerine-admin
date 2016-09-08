(function() {
    'use strict';

    angular
        .module('layout.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http', '$rootScope', '$cookies'];
    function SidebarLoader($http, $rootScope, $cookies) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var loggedIn = $cookies.get('loggedIn');
          if( loggedIn = true){
            var menuJson = 'assets/user-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache

            var user = $cookies.getObject('currentUser');
             
            if(user!=null && user.roles[0]==='_admin'){
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

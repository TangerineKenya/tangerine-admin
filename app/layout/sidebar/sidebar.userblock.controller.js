(function() {
    'use strict';

    angular
        .module('layout.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$cookies'];
    function UserBlockController($rootScope, $cookies) {

        activate();

        ////////////////

        function activate() {
          var user = $cookies.get('currentUser');
          
          if(user){
            $rootScope.user = {
              name:     user.name,
              job:      '',
              picture:  'images/user/02.jpg'
            };
          }
          else{
            alert('The user cannot be found');
          }

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });
        }
    }
})();

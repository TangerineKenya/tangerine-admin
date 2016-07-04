(function () {
  'use strict';

  angular.module('tangerineAdmin')
    .config(menuConfig);

  //menuConfig.$inject = ['menuService'];
  /* @ngInject */
  function menuConfig() {

    // var sidebarMenu = [{
    //     text: "Main Navigation",
    //     heading: "true",
    //     translate: "sidebar.heading.HEADER"
    // }];
    // menuService.setMenu('sidebar', sidebarMenu);
  }

})();

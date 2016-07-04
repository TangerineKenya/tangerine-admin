/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('tangerineAdmin')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        });
})();

(function () {
    'use strict';

    angular
        .module('layout')
		.directive('href', directive);

	function directive() {
	  return {
	    restrict: 'A',
	    compile: function(element, attr) {
	        return function(scope, element) {
	          if(attr.ngClick || attr.href === '' || attr.href === '#'){
	            if( !element.hasClass('dropdown-toggle') )
	              element.on('click', function(e){
	                e.preventDefault();
	                e.stopPropagation();
	              });
	          }
	        };
	      }
	   };
	};

})();
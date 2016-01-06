(function () {
    'use strict';
    angular.module('sections.demographics')
        .directive('svDemographicsHeaderBtn', function ($state) {
            return {
                replace: true,
                templateUrl: 'scripts/sections/demographics/directives/sv-demographics-header-btn.html',
                scope: {},
                link: function ($scope, el, attrs) {
                }
            };
        });
})();

(function () {
    'use strict';

    angular.module('sections.radio')
        .directive('svHeaderRadioBtn', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/radio/directives/sv-header-radio-btn.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();

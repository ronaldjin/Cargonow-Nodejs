(function () {
    'use strict';
    angular.module('common')
        .directive('svLinkBack', function (userAuth, $state) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-link-back.html',
                scope: {},
                link: function ($scope, el, attrs) {
                }
            };
        });
})();

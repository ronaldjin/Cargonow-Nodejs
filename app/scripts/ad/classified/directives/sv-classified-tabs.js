(function () {
    'use strict';
    angular.module('ad.classified')
        .directive('svClassifiedTabs', function ($state) {
            return {
                replace: true,
                templateUrl: 'scripts/ad/classified/directives/sv-classified-tabs.html',
                link: function ($scope, el, attrs) {



                }
            };
        });
})();

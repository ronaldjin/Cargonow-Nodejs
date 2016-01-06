(function () {
    'use strict';

    angular.module('ad.promotion')
        .directive('svSliderBtn', function () {
            return {
                replace: true,
                templateUrl: 'scripts/ad/promotion/directives/sv-slider-btn.html',
                link: function ($scope, el, attrs) {

                }
            };
        });
})();

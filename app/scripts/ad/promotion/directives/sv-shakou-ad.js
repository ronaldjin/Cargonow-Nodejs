(function () {
	'use strict';
	angular.module('ad.promotion')
		.directive('svShakouAd', function ($window, $timeout) {
			return {
				replace: true,
				templateUrl: 'scripts/ad/promotion/directives/sv-shakou-ad.html',
				scope: {},
				link: function ($scope, el, attrs) {
					$scope.orel = Math.random() >= 0.5;
					var offsetWidth = el.parent()[0].offsetWidth;
					var ratio = offsetWidth / 738 > 1 ? 1 : offsetWidth / 738;
					var w = angular.element($window);
					$scope.w = offsetWidth >= 738 ? 738 : offsetWidth;
					$scope.h = (ratio * 200).toFixed(2);
					$scope.svStyle = {width: $scope.w + 'px', height: $scope.h + 'px'};
					$scope.getWindowDimensions = function () {
						return {
							'h': w.height(),
							'w': w.width()
						};
					};
					$scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
						offsetWidth = el.parent()[0].offsetWidth;
						ratio = offsetWidth / 738 > 1 ? 1 : offsetWidth / 738;
						$scope.w = offsetWidth >= 738 ? 738 : offsetWidth;
						$scope.h = Math.floor(ratio * 200);
						$scope.svStyle = {width: $scope.w + 'px', height: $scope.h + 'px'};
					}, true);
					w.bind('resize', function () {
						$scope.$apply();
					});
				}
			};
		});
})();

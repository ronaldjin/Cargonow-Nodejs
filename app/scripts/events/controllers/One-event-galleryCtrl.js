(function () {
    'use strict';

    angular.module('events')
        .controller('One-event-galleryCtrl', function ($scope, $state, $stateParams) {
            $scope.$parent.showEventInfo = false;

            $scope.activeImg = _.isEmpty($stateParams.photoId) ? null : $stateParams.photoId;

            $scope.goBackToGallery = function () {
                $scope.$parent.showEventInfo = true;
                $state.go('^');
            };

        });
})();


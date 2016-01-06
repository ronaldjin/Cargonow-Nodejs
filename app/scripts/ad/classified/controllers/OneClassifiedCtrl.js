(function () {
    'use strict';
    angular.module('ad.classified')
        .controller('OneClassifiedCtrl', function ($scope, $stateParams, ClassifiedServ, classified) {
            var section = $stateParams.clSection;
            $scope.id = $stateParams.clId;
            $scope.isList = _.isEmpty($scope.id);

            if ($scope.id) {
                $scope.cl = ClassifiedServ.getClByKey($scope.id);
            } else {
                $scope.allCls = classified.list;
            }

        });
})();


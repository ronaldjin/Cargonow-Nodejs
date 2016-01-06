(function () {
    'use strict';
    angular.module('sections.radio')
        .controller('RadioArchiveCtrl', function ($scope, RadioProgramsServ, $sce) {
            var programs = RadioProgramsServ.all();
            programs.$loaded().then(function (data) {
                $scope.programs = _.map(data.reverse(), function (one) {
                    if (one.$id.length > 8) {
                        one.date = one.$id.substr(1);
                    } else {
                        one.date = one.$id;
                    }
                    one.date = moment(one.date, 'YYYYMMDD').format('LL');
                    return one;

                });
            })

        });
})();


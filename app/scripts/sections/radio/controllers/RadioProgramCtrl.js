(function () {
	'use strict';
	angular.module('sections.radio')
		.controller('RadioProgramCtrl', function ($stateParams, $scope, RadioProgramsServ, youtubeBase, $sce) {
			var dt;
			var programId = $stateParams.radioId;
			$scope.program = RadioProgramsServ.get(programId);
			var reg = new RegExp('^http');
			$scope.program.$loaded().then(function () {
				console.log($scope.program);
				$scope.program.guests= _.toArray($scope.program.guests).map(function (guest) {
					if (!guest.webUrl.match(reg)) {
						guest.webUrl='http://'+guest.webUrl;
					}
					return guest;

				});
			});
			/*date*/
			if (programId.length > 8) {
				dt = programId.substr(1);
			} else {
				dt = programId;
			}
			$scope.dt = moment(dt, 'YYYYMMDD').format('LL');
			$scope.convertUrl = function (youtubeKey) {
				var value = youtubeBase + youtubeKey;
				return $sce.trustAsResourceUrl(value);
			};

		});
})();


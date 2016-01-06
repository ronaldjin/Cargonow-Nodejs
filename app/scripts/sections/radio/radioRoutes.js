(function () {
    'use strict'
    angular.module('sections.radio', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                /*=home*/

				.state("app.radio-archive", {
					url: "/radio-archive",
					controller:"RadioArchiveCtrl",
					templateUrl: "scripts/sections/radio/views/radio-archiveCtrl.html"
				})
				.state("app.radio-archive.program", {
					url: "/:radioId",
					controller:"RadioProgramCtrl",
					templateUrl: "scripts/sections/radio/views/radio-programCtrl.html"
				})
//#state'
        });
})();

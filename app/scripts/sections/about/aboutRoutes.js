(function () {
    'use strict'

    angular.module('sections.about', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("app.about", {
                    abstract: true,
                    url: "/about",
                    controller: "AboutCtrl",
                    templateUrl: "scripts/sections/about/views/aboutCtrl.html"
                })
                .state("app.about.about-tab-content", {
                    url: "/svet-russian-media-group",
                    templateUrl: "scripts/sections/about/views/about-tab-contentCtrl.html"
                })
                .state("app.about.demographics-tab-content", {
                    url: "/russian-speaking-demographics",
                    controller: "DemographicsTabContentCtrl",
                    templateUrl: "scripts/sections/about/views/demographics-tab-contentCtrl.html"
                })
                .state("app.about.google-analytics", {
                    url: "/google-analytics",
                    templateUrl: "scripts/sections/about/views/google-analyticsCtrl.html"
                })
        });
})();

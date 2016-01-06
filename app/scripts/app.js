(function () {
    angular.module('app', [
        // modules
        'ui.router',
        //'ngFamous',
        'ngFileUpload',
        'pascalprecht.translate',
        'underscore.string',
        'auth',
        'ad',
        'ngMaterial',
        'textAngular',
        'blogs',
        'auth.user',
        'auth.manager',
        'auth.notifications',
        'ad.classified',
        'ad.promotion',
        'article',
        'events',
        'common',
        'sections.header',
        'sections.about',
        'sections.demographics',
        'sections.archive',
        'sections.home',
        'sections.contact',
        'sections.testimonials',
        'sections.radio',
        'sections.widgets',
        // 3rd party modules
        'ngCookies',
        'angular-capitalize-filter',
        'ngAnimate',
        'flow',
        'ngSanitize',
        'lumx',
        'ngMessages',
        'ngTouch',
        'toastr',
        //'angulike',
        'ezfb',
        'djds4rce.angular-socialshare',
        'firebase',
        'mwl.calendar'
    ])
        .config(function (ezfbProvider) {
            ezfbProvider.setInitParams({
                xfbml: true,
                appId: '422346614642986',
                version: 'v2.8'
            });
        })
        .config(function (ezfbProvider) {
            var myInitFunction = function ($window, $rootScope, ezfbInitParams) {
                $window.FB.init({
                    appId: '422346614642986'
                });
                // or
                // $window.FB.init(ezfbInitParams);

                $rootScope.$broadcast('FB.init');
            }
        })
        .config(function ($mdThemingProvider, $mdIconProvider, $compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|mms):/);
            $mdIconProvider
                .defaultIconSet("./img/svg/avatars.svg", 128)
                .icon("menu", "./img/svg/menu.svg", 24)
                .icon("share", "./img/svg/share.svg", 24)
                .icon("google_plus", "./img/svg/google_plus.svg", 512)
                .icon("hangouts", "./img/svg/hangouts.svg", 512)
                .icon("twitter", "./img/svg/twitter.svg", 512)
                .icon("phone", "./img/svg/phone.svg", 512);

            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('red');
        })

        .config(function ($sceProvider, $translateProvider) {
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.useCookieStorage();
            $translateProvider.preferredLanguage('ru');

        })
        .config(function ($httpProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
            $urlMatcherFactoryProvider.strictMode(false);
            $urlRouterProvider.rule(function ($injector, $location) {

                var path = $location.path(), search = $location.search();

                var path2 = path[path.length - 1];

                if (path2 !== '/') {
                    if (search === {}) {
                        var myPath = path + '/';
                        console.log(myPath);
                        return myPath;

                    } else {
                        var params = [];
                        angular.forEach(search, function (v, k) {
                            params.push(k + '=' + v);
                        });
                        return path + '/?' + params.join('&');
                    }
                }
            });
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

        })
        //.factory('$exceptionHandler', function ($injector) {
        //    return function (exception, cause) {
        //        var $rootScope = $injector.get('$rootScope');
        //        var toastr = $injector.get('toastr');
        //        exception.message = exception.stack;
        //
        //        ////Comment on Production
        //        toastr.error('ERROR!' + exception.message);
        //        $rootScope.$broadcast('error');
        //        throw exception;
        //    };
        //})
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
})();

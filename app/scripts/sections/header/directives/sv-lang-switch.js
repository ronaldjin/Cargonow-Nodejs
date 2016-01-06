(function () {
    'use strict';
    angular.module('sections.header')
        .directive('svLangSwitch', function ($translate, $rootScope, ArticlesServ) {
            return {
                replace: true,
                templateUrl: 'scripts/sections/header/directives/sv-lang-switch.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var savedLang = $translate.use();
                    $scope.langEng = savedLang == 'en';
                    $rootScope.langEng = savedLang == 'en';
                    $scope.changeLanguage = function (key) {
                        $translate.use(key);
                        $scope.langEng = key == 'en';
                        $rootScope.langEng = key == 'en';
                        ArticlesServ.filterByLanguage().then(function () {
                            $rootScope.$broadcast('homeNewsChanged');
                        });
                    };
                }
            };
        });
})();

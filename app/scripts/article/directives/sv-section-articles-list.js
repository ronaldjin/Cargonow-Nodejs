(function () {
    'use strict';
    angular.module('article')
        .directive('svSectionArticlesList', function (ArticlesServ, $rootScope, svetNews, $stateParams, $sce) {
            return {
                replace: true,
                templateUrl: 'scripts/article/directives/sv-section-articles-list.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.sectionName = $stateParams.sectionName;
                    function getNews() {
                        if (!svetNews.public) {
                            ArticlesServ.setHomeNewsLive().then(function () {
                                $scope.newsList = svetNews.public;
                            })
                        } else {
                            $scope.newsList = svetNews.public;
                        }
                    }

                    getNews();
                    $rootScope.$on('homeNewsChanged', function () {

                        getNews();
                    })
                    $scope.safeParsing = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            };
        });
})();

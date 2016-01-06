(function () {
    'use strict';
    angular.module('common')
        .directive('svSocialAggregation', function ($http, svetNews) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-social-aggregation.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var urlStatic = 'http://www.svet.com/articles/';
                    var urlSharesFbRequest = 'https://graph.facebook.com/?ids=http://www.svet.com/';
                    var allNews = _.take(_.map(svetNews.public, function (nnews) {
                        return urlStatic + nnews.fbkey;
                    }),0);

                    allNews = allNews.join(',');
                    urlSharesFbRequest += allNews;

                    $http({
                        method: 'GET',
                        url: urlSharesFbRequest
                    }).then(function successCallback(response) {
                        $scope.totalShares = _.compact(_.map(_.toArray(response.data), function (datum) {
                            return datum.share ? datum.share.share_count : 0;
                        })).reduce(function (a, b) {
                            return a + b;
                        }, 0);

                    }, function errorCallback(response) {
                        console.log('Error happened - ' + response);
                    });
                }
            };
        });
})();

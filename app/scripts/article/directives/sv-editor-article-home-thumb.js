(function () {
    'use strict';
    angular.module('article')
        .directive('svEditorArticleHomeThumb', function (userAuth, BlogServ, lastEditorPost, $rootScope) {
            return {
                replace: true,
                templateUrl: 'scripts/article/directives/sv-editor-article-home-thumb.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.user = userAuth.profile;
                    $rootScope.$on('homeNewsChanged', function () {

                        BlogServ.setLastBlogLive().then(function () {
                            $scope.post = lastEditorPost.post;
                        });
                    })

                    BlogServ.setLastBlogLive().then(function () {
                        $scope.post = lastEditorPost.post;
                    });
                }
            };
        });
})();

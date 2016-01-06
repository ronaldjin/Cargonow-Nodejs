(function () {
    'use strict';
    angular.module('blogs')
        .factory('BlogsServ', function ($q, url, users, $rootScope, $firebaseObject, $firebaseArray,svetBlogsConst) {

            var ref = new Firebase(url + 'articles');
            var blogsArr = $firebaseArray(ref);


            function setPublicBlogsLive(blogs) {
                var publicNews = _.where(blogs, {isPublic: true, isBlog: true});
                var langEnglish = $rootScope.langEng;

                publicNews = _.filter(publicNews, function (item) {
                    if (langEnglish) {
                        return  (item.tags && item.tags.indexOf('english') > -1);
                    } else{
                        return (!item.tags || (item.tags && item.tags.indexOf('english')===-1));
                    }


                });
                svetBlogsConst.public = _.sortBy(publicNews, '-timestamp');
            }

            return {
                setBlogsLive: function () {
                    return $q(function (resolve, reject) {
                        blogsArr.$loaded(function () {
                            setPublicBlogsLive(blogsArr);
                            blogsArr.$watch(function () {
                                setPublicBlogsLive(blogsArr);
                            });
                            resolve();
                        })
                    });
                },
            };
        });
})();

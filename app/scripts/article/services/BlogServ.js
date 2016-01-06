(function () {
	'use strict';
	angular.module('article')
		.factory('BlogServ', function ($q, url, users, $rootScope, $firebaseObject, $firebaseArray, lastEditorPost) {
			var ref = new Firebase(url + 'articles');
			var articlesArr = $firebaseArray(ref);

			function setLastBlogBinding(articles) {
				return $q(function (resolve, reject) {
					var blogs = _.where(articles, {isBlog: true, isPublic: true});

                    var langEnglish = $rootScope.langEng;
                    blogs = _.filter(blogs, function (item) {
                        if (langEnglish) {
                            return  (item.tags && item.tags.indexOf('english') > -1);
                        } else{
                            return (!item.tags || (item.tags && item.tags.indexOf('english')===-1));
                        }


                    });

					if (blogs.length) {
						var lastBlog = _.last(blogs);
						var lastBlogArticleObj = $firebaseObject(ref.child(lastBlog.$id));
						lastBlogArticleObj.$loaded(function () {
							lastEditorPost.post = lastBlogArticleObj;
							resolve();
						});
					} else {
						resolve();
					}
				});
			}

			return {
				setLastBlogLive: function () {
					return $q(function (resolve, reject) {
						articlesArr.$loaded(function () {
							articlesArr.$watch(function () {
								setLastBlogBinding(articlesArr).then(function () {
								});
							})
							setLastBlogBinding(articlesArr).then(function () {
								resolve();
							});
						});
					});
				},
				getPost: function (postId) {
					var postObj = $firebaseObject(ref.child(postId));
					return postObj;
				}
			};
		});
})();

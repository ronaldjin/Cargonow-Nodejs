'use strict'
var _ = require('lodash');
var tagsArticleFilter = require('../filters/TagsArticlesFilter');
var constants = require('./Constants');
module.exports = {
	process: function (news) {
		var articles = _.filter(news, function (oneNews) {
			return oneNews.isBlog === false;
		});
		var blogs = _.filter(news, function (oneNews) {
			return oneNews.isBlog === true;
		});
		var endorsedBySvet = tagsArticleFilter.getArticleWithTags(articles, constants.endorsedSvetTags)
		var svetOnly = tagsArticleFilter.getArticleWithTags(news, constants.onlySvetTags)
		var personality = tagsArticleFilter.getArticleWithTags(news, constants.personalityTags)
		articles = _.sortBy(articles, function (article) {
			return article.newsOrder;
		})
		var mainNews = _.first(articles);
		var secondNews = articles[1];
		var thirdNews = articles[2];
		var ordinalArticles = articles.slice(3);
		var blog = _.first(_.sortBy(blogs, 'timestamp'));
		return {
			mainNews: mainNews,
			secondNews: secondNews,
			thirdNews: thirdNews,
			ordinalArticles: ordinalArticles,
			blog: blog,
			endorsedSvet: endorsedBySvet,
			svetOnly: svetOnly,
			personality: personality
		}
	}
}

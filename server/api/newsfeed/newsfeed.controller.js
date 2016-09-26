'use strict';

var request = require('request'),
	parseString = require('xml2js').parseString,
	_ = require('lodash'),
	newsfeedURL = 'http://rss.cnn.com/rss/money_news_international.rss';

exports.getArticles = function(req, res, next) {

	request(newsfeedURL, function(error, response, body) {

		var parsedArticles = [],
			articlesFromNewsfeed = [];

		if (error) return next(error);

		parseString(body, function(err, result) {

			if (err) return next(err);

			if (_.get(result, 'rss.channel[0].item')) {

				var article;

				articlesFromNewsfeed = result.rss.channel[0].item;

				articlesFromNewsfeed.forEach(function(articleToParse) {

					article = {
						title: '',
						image: '',
						link: '',
						description: '',
						pubDate: ''
					};

					if (_.get(articleToParse, 'title[0]')) article.title = articleToParse.title[0];
					if (_.get(articleToParse, 'media:thumbnail[0].$.url')) article.image = articleToParse['media:thumbnail'][0].$.url;
					if (_.get(articleToParse, 'link[0]')) article.link = articleToParse.link[0];
					if (_.get(articleToParse, 'description[0]')) article.description = articleToParse.description[0].replace(/<img([\w\W]+?)>/, '');
					if (_.get(articleToParse, 'pubDate')) article.pubDate = articleToParse.pubDate[0];
					parsedArticles.push(article);

				});

				res.send(parsedArticles);

			} else next(new Error('No articles returned from newsfeed'));

			return void 0;

		});

		return void 0;

	});

};

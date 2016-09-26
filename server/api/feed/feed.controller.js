'use strict';
var request = require('request'),
	config = require('../../configuration/environment/development.js'),
	responseBody;

exports.getNews = function(req, res, next) {

	request.get({
		url: 'https://api.nytimes.com/svc/topstories/v2/technology.json',
		qs: {
			'api-key': config.NYTAPI
		}
	}, function(err, response, body) {

		if (err) return next(err);

		responseBody = JSON.parse(body);
		res.send(responseBody);

		return void 0;
		
	});

};

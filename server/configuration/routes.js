/*
	middleware pointing on each sub-directory of the api folder for route definitions
*/

'use strict';
var router = require('express').Router(), // eslint-disable-line new-cap
	fs = require('fs'),
	path = require('path'),
	sourcePath = path.join(__dirname, '/../api'),
	routes = fs.readdirSync(sourcePath);

routes.forEach(function(route) {

	if (fs.statSync(path.join(sourcePath, route)).isDirectory()) {

		router.use('/' + route, require('../api/' + route));

	}

});

// Error handler
router.use(function(req, res) {

	res.status(404).end();

});

module.exports = function(app) {

	app.use('/api', router);

};

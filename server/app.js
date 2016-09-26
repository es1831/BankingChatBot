/*
	main app.js
*/

'use strict';
var path = require('path'),
	express = require('express'),
	app = express(),
	chalk = require('chalk'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	config = require('./configuration/environment/development.js');

require(path.join(__dirname, '/configuration/routes.js'))(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../bower_components')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static('client/dist/'));
app.use('/*', express.static(path.join(__dirname, 'views/')));

// Error catch
app.use(function(err, req, res, next) {

	console.error(err, typeof next);
	res.status(err.status || 500).send(err.message || 'Internal server error.');

});


app.listen(config.PORT, function() {

	console.log(chalk.blue('Server started on port', chalk.magenta(config.PORT)));

});

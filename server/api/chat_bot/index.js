/*
	all routes definitions for a specific controller
*/

'use strict';

var express = require('express'),
	controller = require('./chat_bot.controller'),
	router = express.Router(); // eslint-disable-line new-cap


// define route and point an a specific action in this controller
router.post('/', controller.postMessage);

module.exports = router;

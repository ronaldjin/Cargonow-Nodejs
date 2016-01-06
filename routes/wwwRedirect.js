var express = require('express');
var _ = require('lodash');
var router = express.Router();
module.exports = function (req, res, next) {
	var host = req.get('host');
	var protocol = req.protocol;
	var url = req.originalUrl;
	var slsh = '://';
	var fullPath;
	if (host.indexOf('localhost') > -1 || host.match(/^www\..*/i)) {
		if (!_.contains(url, '.') && _.last(url) !== '/') {
			fullPath = protocol + slsh + host + ':' + url + '/';
			res.redirect(fullPath);
		} else {
			next();
		}
	} else {
		fullPath = protocol + slsh + 'www.' + host + ':' + url + '/';
		res.redirect(fullPath);
	}
};


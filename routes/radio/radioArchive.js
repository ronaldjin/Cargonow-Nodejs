var path = require('path');
var _ = require('lodash');
var moment = require('moment');
var firebaseServ = require('../../services/FirebaseServ');
var constants = require('../../services/Constants');
var userAgentServ = require('../../services/UserAgentServ');
module.exports = function radioArchive(express) {
	var radioArchiveRouter = express.Router();
	radioArchiveRouter.get('/:radioId?', function (req, res, next) {
		var radioId = req.params.radioId;
		var userAgent = req.get('user-agent');
		var fullUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;
		if (fullUrl.substr(-1) == '/') {
			fullUrl = fullUrl.substr(0, fullUrl.length - 1);
		}
		if (userAgentServ.amIBot(userAgent)) {
			/*create a view-model for fb crawler*/
			var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
			var clsUrl = constants.url + 'radioWidget' + '/';
			if (!radioId) {
				firebaseServ.getAll(clsUrl).then(function (data) {
					var programs = _.keys(data).sort().reverse().map(function (date) {
						return {key: date, dt: moment(date, 'MMDDYYYY').format('LL')};
					});
					var vm = {
						programs: programs,
						rootUrl: rootUrl,
						fullUrl: fullUrl,
						title: 'Radio OCA Programs Archive',
						image: 'https://s3-us-west-2.amazonaws.com/svet.com/radio/logo-50-padding.jpg',
						description: 'Radio Talk show With Alexander Etman Every Sunday 1:00 AM - 1:00 PM on 1240AM',
						og: {
							title: 'Radio OCA Programs Archive',
							description: 'Radio Talk show With Alexander Etman Every Sunday 1:00 AM - 1:00 PM on 1240AM',
							image: 'https://s3-us-west-2.amazonaws.com/svet.com/radio/logo-50-padding.jpg',
							url: fullUrl
						}
					};
					res.render('radio/radio-archive', {vm: vm});
				});
			} else {
				firebaseServ.getItem(clsUrl + radioId).then(function (data) {
					var program = data;
					program.dt = moment(radioId, 'MMDDYYYY').format('LL');
					var vm = {
						program: program,
						rootUrl: rootUrl,
						fullUrl: fullUrl,
						title: 'Radio OCA Programs Archive',
						image: 'https://s3-us-west-2.amazonaws.com/svet.com/radio/logo-50-padding.jpg',
						description: 'Radio Talk show With Alexander Etman Every Sunday 1:00 AM - 1:00 PM on 1240AM',
						og: {
							title: 'Radio OCA Programs Archive',
							description: 'Radio Talk show With Alexander Etman Every Sunday 1:00 AM - 1:00 PM on 1240AM',
							image: 'https://s3-us-west-2.amazonaws.com/svet.com/radio/logo-50-padding.jpg',
							url: fullUrl
						}
					};
					res.render('radio/radio-archive', {vm: vm});
				});
			}
		} else {
			next();
		}
	});
	/*Redirect user to AngularJs App*/
	var appFolder =  require('.././dirServ')();
	radioArchiveRouter.use(express.static(appFolder));
	radioArchiveRouter.get('/:radioId?', function (req, res) {
		res.sendFile('index.html', {root: appFolder});
	});
	return radioArchiveRouter;
};

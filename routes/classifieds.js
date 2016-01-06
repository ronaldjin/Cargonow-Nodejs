var path = require('path');
var _ = require('lodash');
var Constants = require('../services/Constants');
var firebaseServ = require('../services/FirebaseServ');
var classifiedFilter = require('../filters/ClassifiedsFilter');
var userAgentServ = require('../services/UserAgentServ');

module.exports = function classifiedsRouter(express) {

    var classifiedsRouter = express.Router();

    classifiedsRouter.get('/:clSection?/:clId?', function (req, res, next) {
        var clSection = req.params.clSection;
        var clId = req.params.clId;

        var userAgent = req.get('user-agent');


        if (userAgentServ.amIBot(userAgent)) {
            /*create a view-model for fb crawler*/
            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

            var vm = {
                rootUrl: rootUrl,
                title: _.capitalize(clSection + ' News')
            };

            var fullUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;

            var clsUrl = Constants.url+ 'cls';
            firebaseServ.getAll(clsUrl).then(function (data) {
                //
                var cls = classifiedFilter.getCls(data.all, clSection, clId);
                vm.sections = _.toArray(data.sections);

                if (_.isArray(cls)) {

                    vm.og = {
                        title: clSection + ' classifieds',
                        description: 'North Chicagoland Russian speaking community announcements. This section contains (' + cls.length + ') personal ads',
                        image: rootUrl + '/img/classified-icon.jpg',
                        url: fullUrl
                    }

                    vm.cls = cls;
                    res.render('classifieds', {vm: vm});

                } else {
                    vm.cl = cls;

                    vm.og = {
                        title: cls.title,
                        description: cls.description,
                        image: rootUrl + '/img/classified-icon.jpg',
                        url: fullUrl
                    }
                    res.render('classified', {vm: vm});
                }

            }, function (Error) {

            });
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder =  require('./dirServ')();
    classifiedsRouter.use(express.static(appFolder));

    classifiedsRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return classifiedsRouter;

};

var path = require('path');
var firebaseServ = require('../services/FirebaseServ');
var userAgentServ = require('../services/UserAgentServ');
var homepageRenderServ = require('../services/HomepageRenderServ');

var url = require('../services/Constants').url;

module.exports = function homeRouter(express) {
    var homeRouter = express.Router();

    homeRouter.get('/', function (req, res, next) {
        var userAgent = req.get('user-agent');

        if (userAgentServ.amIBot(userAgent)) {
            /*create a view-model for fb crawler*/

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            console.log(rootUrl);
            var vm = {
                rootUrl: rootUrl,
                title: 'SVET Russian Media Group, Russian newspaper, radio and yellow pages in Chicago, Advertising for Russian community',
                og: {
                    title: 'SVET Russian Media Group',
                    description: "SVET Russian Media Group is the Midwest's first and oldest publishing and advertising company serving the Russian, Ukrainian and Lithuanian communities since 1990. Our Products and Services:  SVET Daily Newspaper, Russian-American Yellow Pages, Saturday Plus Weekly Newspaper, Radio Program \"OSA\"",
                    image: rootUrl + '/img/logo/svet-logo-fb.jpg',
                    url: 'http://www.svet.com/'
                }
            };

            var postsUrl = 'https://svet.firebaseio.com/articles';
            firebaseServ.getAll(postsUrl).then(function (news) {
                vm.homeNews = homepageRenderServ.process(news);
                res.render('home', {vm: vm});

            }, function (Error) {

            });
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/

    var appFolder = require('./dirServ')();
    homeRouter.use(express.static(appFolder));

    homeRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return homeRouter;

};

var path = require('path');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function aboutUs(express) {

    var aboutUsRouter = express.Router();

    aboutUsRouter.get('/:aboutContent', function (req, res, next) {

        var userAgent = req.get('user-agent');

        var aboutContent = req.params.aboutContent;

        var fullUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            /*create a view-model for fb crawler*/
            if (aboutContent.indexOf('demographics') > 1) {

                var vm = {
                    rootUrl: rootUrl,
                    title: 'Russian American Demographics',
                    og: {
                        title: 'Is the Russian-speaking population  in the USA an attractive market?',
                        description: 'Definitely! The Russian American population in the United States is reported to be 3.13 million people* It is the second largest ethnic market, making up  10.4%  of  28.4 million  foreign born people in the country.',
                        image: rootUrl + '/img/seo/ru-demographics-200.png',
                        url:fullUrl
                    }
                };
                res.render('demographics', {vm: vm});
            }
            else {
                var vm = {
                    rootUrl: rootUrl,
                    title: 'About SVET Russian Media Group',
                    og: {
                        title: 'About Svet Russian Media Group',
                        description: 'SVET Russian Media Group  is the Midwest’s first and oldest publishing and advertising company serving the Russian, Ukrainian and Lithuanian communities since 1990.',
                        image: 'https://s3-us-west-2.amazonaws.com/svet.com/home/about-us/aboutus_2-bw.jpg',
                        url:fullUrl
                    }
                };
                res.render('about', {vm: vm});
            }
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    aboutUsRouter.use(express.static(appFolder));

    aboutUsRouter.get('/:aboutContent?', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return aboutUsRouter;

};

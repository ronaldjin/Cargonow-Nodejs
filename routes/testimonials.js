var path = require('path');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function testimonials(express) {

    var testimonialsRouter = express.Router();

    testimonialsRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');
        var fullUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: 'Testimonials Page Title',
                og: {
                    title: 'Testimonials',
                    description: 'SVET testimonials',
                    url: fullUrl
                }
            };

            res.render('testimonials', {vm: vm});
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    testimonialsRouter.use(express.static(appFolder));

    testimonialsRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return testimonialsRouter;

};

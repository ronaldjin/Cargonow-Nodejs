var path = require('path');
var titles = require('../../services/Constants').titles;
var userAgentServ = require('../../services/UserAgentServ');

module.exports = function events(express) {

    var eventsRouter = express.Router();
    eventsRouter.get('/:eventName', function (req, res, next) {
        var eventName = req.params.eventName;

        var userAgent = req.get('user-agent');

        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;
            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: titles[eventName],
                og: {
                    url: rootUrl,
                    title: titles[eventName],
                    description: 'You are Invited to Annual Svet Family Event at  KOHL CHILDREN’S MUSEUM. Bring your whole family! Invite your friends and customers! Complimentary breakfast, refreshments, face painting for children plus give-away during event. Free admission.',
                    image: "http://res.cloudinary.com/svet-russian-media-group/image/upload/c_scale,w_645/v1469237238/6000_KOHL_6N_CLR_YMCA_ENG_twrpc5.jpg"
                }
            };

            res.render('events/' + eventName, {vm: vm});
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder =  require('.././dirServ')();
    eventsRouter.use(express.static(appFolder));

    eventsRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return eventsRouter;

};

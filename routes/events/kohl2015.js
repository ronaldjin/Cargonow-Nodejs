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
                    description: 'Last Sunday, June 14, 2015,  SVET Russian Media successfully held yet another SVET Annual Family Event at  KOHL CHILDREN’S MUSEUM  for the fourth time in a row. This time we set a new attendance record –495 guests  , not counting the  numerous sponsors and members of their families.',
                    image: "http://s3-us-west-2.amazonaws.com/svet.com/home/kohl-2015/family-with-boy.jpg"
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

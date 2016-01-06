var express = require('express');
var compress = require('compression');
var path = require('path');
var http = require('http');
var helmet = require('helmet');
var slash = require('express-slash');

var app = express();
app.disable('strict routing');
//app.use(function(req, res, next) {
//	if(req.url.substr(-1) == '/' && req.url.length > 1)
//		res.redirect(301, req.url.slice(0, -1));
//	else
//		next();
//});
// Jade to Html formatting on browser
app.locals.pretty = false;
/*configure server security not to reveal which server you are running*/
app.disable('x-powered-by');
app.use(compress());
// Managing template engine for Express (Jade)
app.set('view engine', 'jade'); // register the template engine
app.set('views', path.join(__dirname, 'views')); // specify the views directory

/*local*/
var wwwRedirect = require('./routes/wwwRedirect');
var ip;
var hostIp = require('./routes/hostIp')(express, ip);

var homeRouter = require('./routes/home')(express);
var articlesRouter = require('./routes/articles')(express);
var sectionsRouter = require('./routes/sections')(express);
var classifiedsRouter = require('./routes/classifieds')(express);
var testimonialsRouter = require('./routes/testimonials')(express);
var contactUsRouter = require('./routes/contact')(express);
var aboutUsRouter = require('./routes/about')(express);
var kohl2015Router = require('./routes/events/kohl2015')(express);
var kohl2016Router = require('./routes/events/kohl2016')(express);
var galleryRouter = require('./routes/events/gallery');
var radioArchiveRouter = require('./routes/radio/radioArchive')(express);

// --- Routes ---

app.all(/.*/, wwwRedirect);


app.use('/articles', articlesRouter);
app.use('/radio-archive', radioArchiveRouter);
app.use('/testimonials', testimonialsRouter);
// app.use('/events/kohl2015/photo-gallery/', galleryRouter);
app.use('/events', kohl2016Router);
// app.use('/events/kohl2015', kohl2015Router);
app.use('/sections', sectionsRouter);
app.use('/classifieds', classifiedsRouter);
app.use('/contact', contactUsRouter);
app.use('/about', aboutUsRouter);
app.use('/', homeRouter);

//// Transfer any unrecognized route to Angular
//var appFolder = path.join(__dirname, 'build');
//var appFolder = path.join(__dirname, 'app');
var appFolder = require('./routes/dirServ')();

app.use(express.static(appFolder));

app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: appFolder});
});
// END Tranfer any unrecognized route to Angular

///*Error-handling middleware*/
//if (app.get('env') === 'dev') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//
//app.use(function (req, res, next) {
//    var err = new Error('Sorry cant find that!');
//    err.status = 404;
//    next(err);
//});
//
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    console.log(err.message);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

/*Create http server*/
// var port = 80;
var port = 5000;
// var port = process.platform === 'win32' ? 5000 : 80;

app.listen(port, function () {
    console.log('listen on port ' + port);
});

module.exports = app;

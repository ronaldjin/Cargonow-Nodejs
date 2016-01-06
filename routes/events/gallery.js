var express = require('express');
var path = require('path');
/* Core node.js module to query list of images from AWS3. */
var _ = require('lodash');
var http = require('http');
var userAgentServ = require('../../services/UserAgentServ');

var galleryRouter = express.Router();

galleryRouter.get('/', function (req, res, next) {

    var userAgent = req.get('user-agent');

    function reverseImages(reverseOrder, files) {

        var reversedFiles = [];
        if (reverseOrder) {
            for (var i = files.length - 1; i >= 0; i--) {

                var file = files[i];
                reversedFiles.push(file);
            }
        } else {
            reversedFiles = files;
        }
        return reversedFiles;
    }

    if (userAgentServ.amIBot(userAgent)) {
        var vm = {
            title: 'Event Gallery'
        }

        var bucketUrl = 'http://s3-us-west-2.amazonaws.com/kohl/';

        xmlBucketImgsParser(bucketUrl, function (err, data) {
            /*------------------------ Parsing AWS3 filenames from Amazon*/
            var jpgFile = '';
            if (err) {
                return console.err(err);
            }
            var myRegexp = /<key>([^<])+/gi;
            var match;
            var files = [];

            var myString = data;
            match = myRegexp.exec(myString);
            while (match !== null) {
                if (match) {

                    var fileName = match[0].replace('<Key>', '');
                    files.push(fileName);
                }
                match = myRegexp.exec(myString);
            }
            /*------------------------ END Parsing AWS3 filenames from Amazon*/

            /*------------------------ Converting  array of AWS filenames to array of object with filenames and full url*/
            var fullUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;

            var reverseOrder = true;
            files = reverseImages(reverseOrder, files);
            vm.files = _.map(files, function (file, n) {
                return {
                    imgName: file,
                    url: fullUrl + '/' + n
                }
            });
            /*------------------------END Converting  array of AWS filenames to array of object with filenames and full url*/

            /*------------------------ Checking if image collection is requested or 1 image------------------------*/
            var imgId = req.params.id;
            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

            vm.rootUrl = rootUrl;
            if (imgId) {
                vm.activeImg = parseInt(imgId);
                var activeImageFileName = files[imgId];
                var caption = convertImgFileNameToCaption(activeImageFileName);
            }
            var galleryFrontImage = files[0];
            vm.og = {
                bucketUrl: bucketUrl,
                url: fullUrl,
                title: "Svet Kohl Children Museum Photo Gallery",
                description: 'Family Event at Kohl Children Museum organized by Svet Russian Media Group',
                image: bucketUrl + activeImageFileName || galleryFrontImage
            }
            vm.imgsCount = parseInt(files.length);
            /*------------------------END Checking if full collection is requested or 1 image------------------------*/
            res.render('gallery', {vm: vm});
        });

        function convertImgFileNameToCaption(jpgFile) {
            var convertedFile;

            if (jpgFile) {
                var dotIndex = jpgFile.indexOf('.');
                convertedFile = _.startCase(jpgFile.substr(0, dotIndex));
            }
            return convertedFile;
        }

    } else {

        next();
    }
});

var appFolder =  require('.././dirServ')();
galleryRouter.use(express.static(appFolder));

galleryRouter.get('/:id?', function (req, res) {
    res.sendFile('index.html', {root: appFolder});
});

function xmlBucketImgsParser(url, callback) {
    var req = http.get(url, function (res) {
        var xml = '';

        res.on('data', function (chunk) {
            xml += chunk;
        });

        res.on('error', function (e) {
            callback(e, null);
        });

        res.on('timeout', function (e) {
            callback(e, null);
        });

        res.on('end', function () {
            //
            callback(null, xml);
        });
    });
}

module.exports = galleryRouter;


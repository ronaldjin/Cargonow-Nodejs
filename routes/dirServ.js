var os = require("os");
var appRoot = require('app-root-path');
module.exports = function (startDir) {
    var user = process.env.USER;
    var devProd=process.env.NODE_ENV;

    if ((devProd === 'dev')) {
        return appRoot + '/app';
    } else {
        return appRoot + '/build';
    }
};


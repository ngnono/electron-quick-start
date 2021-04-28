const log4js = require("log4js");
var path = require("path");

log4js.configure(path.resolve(__dirname)+'/log4js.json');
const def = log4js;

exports.default = def;
// For CommonJS default export support
module.exports = def;
module.exports.default = def;

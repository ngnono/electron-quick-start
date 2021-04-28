/**
 * 延时
 * @param ms
 * @returns {Promise<unknown>}
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.default = {
  delay
};
// For CommonJS default export support
module.exports = {
  delay
};
module.exports.default = {delay};

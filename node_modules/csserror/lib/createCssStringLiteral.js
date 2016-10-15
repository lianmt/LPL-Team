var leftPad = require('./leftpad');

function createCssStringLiteral(str, doubleEscape) {
  return '"' + str.replace(/[\\\x00-\x1f\x21-\x2f]/g, function ($0) {
    return '\\' + (doubleEscape ? '\\' : '') + leftPad($0.charCodeAt(0).toString(16), 6, '0');
  }) + '"';
}

module.exports = createCssStringLiteral;

var semver = require('semver');

try {
  var version = require('node-sass/package.json').version;

  if (semver.satisfies(version, '0.x')) {
    module.exports = require('../version-0');
  } else if (semver.satisfies(version, '1.x')) {
    module.exports = require('../version-1');
  } else if (semver.satisfies(version, '2.x')) {
    module.exports = require('../version-2');
  } else {
    module.exports = require('node-sass');
  }
} catch(err) {
  throw new Error('node-sass-evergreen: Could not load the node-sass package. Did you remember to install it?');
}

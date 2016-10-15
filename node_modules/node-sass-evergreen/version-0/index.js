'use strict';

var sass = require('node-sass');
var extend = require('extend');
var Path = require('path');

var fs = require('fs');
var when = require('when');
var node = require('when/node');

var version = require('node-sass/package.json').version;

var inlineSourceMapComment = require('inline-source-map-comment');

function typesError() {
  throw new Error('types are not available in node-sass ' + version);
}

function qualifyError(err) {
  if (err.indexOf('error reading file') === 0) {
    var filePath = err.match(/(?:")(.*?)(?:")/)[1];

    return {
      status: 4,
      message: 'File to read not found or unreadable: ' + Path.join(process.cwd(), filePath)
    };
  } else {
    var file = err.match(/^[^:]+/)[0];
    var line = parseInt(err.match(/:(\d+):/)[1] || 0);
    var message = err.match(/error: (.*)/)[1];

    if (file === 'source string') {
      file = 'stdin';
    }

    var errObj = {
      line: line,
      file: file
    };

    if (message.indexOf('file to import not found or unreadable:') === 0) {
      var currentDir = Path.dirname(file);

      message = message.replace(/'/g, '') + '\nCurrent dir: ' + currentDir + '/';
      errObj.status = 1;
    }

    return extend(new Error(message), errObj);
  }
}

function polyFillOptions(options, cb) {
  var successCallback, errorCallback;
  var stats = {};
  var sourceMap = options.sourceMap && (options.outFile || options.sourceMap);

  if (typeof options.importer === 'function' || Array.isArray(options.importer)) {
    throw new Error('options.importer is not supported in node-sass ' + version);
  }

  if (options.indentedSyntax === true) {
    throw new Error('options.indentedSyntax is not supported in node-sass ' + version);
  }

  if (options.sourceComments && sourceMap) {
    throw new Error('options.sourceComments is not supported in node-sass ' + version + ' when using options.sourceMap');
  }

  if (sourceMap && !options.file) {
    throw new Error('options.sourceMap is not supported in node-sass ' + version + ' when using options.data');
  }

  if (cb) {
    successCallback = function(css) {
      var sourceMap;

      if (stats.sourceMap) {
        sourceMap = JSON.parse(stats.sourceMap);

        sourceMap.sourcesContent = sourceMap.sourcesContent || [];

        sourceMap.file = options.outFile;
      }

      delete stats.sourceMap;

      if (options.sourceComments === true && options.data) {
        css = css.replace(', source string */', ', stdin */');
      }

      var doneCallback = function () {
        var sourceMapStr = sourceMap && JSON.stringify(sourceMap);

        if (sourceMapStr && options.sourceMapEmbed) {
          css += '\n' + inlineSourceMapComment(sourceMapStr, { block: true }) + '\n';
        }

        cb(null, {
          css: new Buffer(css, 'utf8'),
          map: sourceMapStr && new Buffer(sourceMapStr, 'utf8'),
          stats: stats
        });
      };

      if (sourceMap && options.sourceMapContents) {
        var readFile = node.lift(fs.readFile);
        when.map(sourceMap.sources, function (path) {
          return readFile(path, 'utf8');
        }).then(function (result) {
          sourceMap.sourcesContent = result;
        }).done(doneCallback, doneCallback);
      } else {
        doneCallback();
      }
    };

    errorCallback = function (err) {
      cb(qualifyError(err));
    };
  }

  return extend({}, options, {
    success: successCallback,
    error: errorCallback,
    stats: stats,
    sourceComments: options.sourceMap ? 'map' : (options.sourceComments === true ? 'normal' : 'none'),
    sourceMap: sourceMap && (Path.relative(Path.basename(options.file), sourceMap) + '.map'),
    omitSourceMapUrl: options.omitSourceMapUrl || options.sourceMapEmbed
  });
}

module.exports = extend({}, sass, {
  version: version,

  info: 'node-sass\t' + version + '\t(Wrapper)\t[JavaScript]\nlibsass  \t?.?.?\t(Sass Compiler)\t[C/C++]',

  render: function (options, cb) {
    var compatOptions = polyFillOptions(options, cb);

    sass.render(compatOptions);
  },

  renderSync: function (options) {
    var compatOptions = polyFillOptions(options);
    var result;

    if (compatOptions.sourceComments === 'map') {
      throw new Error('options.sourceMap is not supported in node-sass ' + version + ' when using renderSync');
    }

    try {
      result = sass.renderSync(compatOptions);
    } catch (err) {
      var qualified = qualifyError(err);
      var newErr = new Error(qualified.message);

      throw extend(newErr, qualified);
    }

    if (options.data) {
      result = result.replace(', source string */', ', stdin */');
    }

    var returnValue = {
      css: new Buffer(result, 'utf8'),
      stats: compatOptions.stats
    };

    delete returnValue.stats.sourceMap;

    return returnValue;
  },

  types: {
    'Number': typesError,
    'String': typesError,
    'Color': typesError,
    'Boolean': typesError,
    'List': typesError,
    'Map': typesError,
    'Null': typesError
  }
});
